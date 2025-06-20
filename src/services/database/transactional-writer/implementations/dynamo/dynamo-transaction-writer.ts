import {
  DynamoDBClient,
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsInput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { DynamoSchema } from '@database/schema/implementations/dynamo';
import {
  ITransactionalWriter,
  ITransactionalWriterUnit,
} from '@database/transactional-writer/contracts';
import {
  MaxItemsExceededError,
} from '@database/transactional-writer/implementations/dynamo';
import { DynamoTransactionWriterEventLogger } from './dynamo-transaction-writer-event-logger';

export type Units = ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[]

/**
 * Provides a transactional writer implementation for DynamoDB using AWS SDK.
 * It handles writing multiple items in a single atomic transaction and performs
 * validation on batch size and item keys.
 */
export class DynamoTransactionWriter
  implements ITransactionalWriter<DynamoSchema<any>, Record<string, unknown>> {
  private readonly maxBatchItems: number = 100; // DynamoDB limit for batch write operations

  /**
   * Creates a new instance of DynamoTransactionWrite.
   *
   * @param {DynamoDBClient} client - AWS DynamoDB Client instance
   * @param {DynamoTransactionWriterEventLogger} [logger] - Optional logger for transaction events
   */
  constructor(
    private readonly client: DynamoDBClient,
    private readonly logger?: DynamoTransactionWriterEventLogger
  ) { }

  /**
   * Writes a batch of items to DynamoDB transactionally.
   * 
   * This method validates the batch size and key schema before sending the transaction.
   * 
   * It implements **optimistic concurrency control** using a `version` field
   * (UUID v4). If an item already exists, the transaction will only proceed if the
   * provided `version` matches the version stored in the database. This prevents
   * accidental overwrites in concurrent environments.
   * 
   * For new items (where the keys do not exist), the transaction proceeds without
   * checking the version.
   * 
   * After each successful write, a new UUID is assigned to the `version` field,
   * allowing future updates to detect changes.
   * 
   * Additionally, it generates a unique `ClientRequestToken` for each transaction
   * using `crypto.randomUUID()`, enabling **idempotent** transactional writes
   * and safe retries in case of partial failures or network issues.
   *
   * @param {Units} units -
   * An array of transactional write units, each containing a schema container and
   * an item to be written.
   *
   * @returns {Promise<void>} A promise that resolves when the transaction is successfully committed.
   *
   * @throws {MaxItemsExceededError} If the number of items exceeds DynamoDB's transactional write limit.
   */
  async write(
    units: Units,
  ): Promise<void> {
    this.validateBatchSize(units);
    this.validateKeys(units);

    const transacts = this.buildTransactItems(units);

    const params: TransactWriteItemsInput = {
      TransactItems: transacts,
      ClientRequestToken: crypto.randomUUID(),
    };

    const command = new TransactWriteItemsCommand(params);

    await this.client.send(command);

    this.logger?.transactionSucceeded(units);
  }

  /* Helpers */

  /**
   * Validates that each item in the batch conforms to the key schema
   * defined in its container.
   *
   * @private
   * @param {Units} units -
   * The units whose item keys will be validated.
   */
  private validateKeys(
    units: Units,
  ) {
    for (const unit of units) {
      unit.container.validateKey(unit.item);
    }
  }

  /**
   * Validates that the number of items in the batch does not exceed
   * DynamoDB's transactional write limit.
   *
   * @private
   * @param {any[]} units - The list of units to be written.
   *
   * @throws {MaxItemsExceededError} - If the number of units exceeds the allowed limit.
   */
  private validateBatchSize(units: any[]): void {
    if (units.length > this.maxBatchItems) {
      throw new MaxItemsExceededError(this.maxBatchItems);
    }
  }

  /**
   * Builds a list of TransactWriteItem entries with conditional expressions
   * to ensure either item creation or version consistency.
   *
   * If the item does not exist, it will be inserted.
   * If it exists, the transaction will proceed only if the `version` matches
   * the expected one (optimistic concurrency control).
   *
   * @param units - List of units containing schema and versioned items.
   * @returns An array of TransactWriteItem ready for a DynamoDB transaction.
   */
  private buildTransactItems(units: Units): TransactWriteItem[] {
    return units.map(({ container, item }) => {
      const pkName = container.getPartitionKey().name;
      const skName = container.getSortKey()?.name;
      const hasSortKey = container.hasSortKey();

      const isUpdate = !!item.version;
      const newVersion = crypto.randomUUID();

      if (isUpdate) {
        const condition = hasSortKey
          ? 'attribute_exists(#pk) AND attribute_exists(#sk) AND version = :expectedVersion'
          : 'attribute_exists(#pk) AND version = :expectedVersion';

        const result = {
          Put: {
            TableName: container.getTableName(),
            Item: marshall({ ...item, version: newVersion }, { removeUndefinedValues: true }),
            ConditionExpression: condition,
            ExpressionAttributeNames: {
              '#pk': pkName,
              ...(hasSortKey && skName ? { '#sk': skName } : {}),
            },
            ExpressionAttributeValues: {
              ':expectedVersion': { S: String(item.version) },
            },
          },
        };

        this.logger?.logTransactWriteCommand(result);

        return result;
      }

      const result = {
        Put: {
          TableName: container.getTableName(),
          Item: marshall({ ...item, version: newVersion }, { removeUndefinedValues: true }),
        },
      };

      this.logger?.logTransactWriteCommand(result);

      return result;
    });
  }
}
