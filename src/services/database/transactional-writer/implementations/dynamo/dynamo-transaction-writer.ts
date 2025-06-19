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
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

/**
 * Provides a transactional writer implementation for DynamoDB using AWS SDK.
 * It handles writing multiple items in a single atomic transaction and performs
 * validation on batch size and item keys.
 */
export class DynamoTransactionWriter
  implements ITransactionalWriter<DynamoSchema<any>, Record<string, unknown>> {
  private readonly client: DynamoDBClient;
  private readonly maxBatchItems: number = 100; // DynamoDB limit for batch write operations

  /**
   * Creates a new instance of DynamoTransactionWrite.
   *
   * @param {string} [region] - Optional AWS region. If not provided, uses default SDK configuration.
   */
  constructor(region?: string) {
    this.client = new DynamoDBClient(region ? { region: region } : {});
  }

  /**
   * Writes a batch of items to DynamoDB transactionally.
   * 
   * This method validates batch size and key schema before sending the transaction.
   * It implements optimistic concurrency control by computing a SHA-256 hash for each item,
   * which is used in conditional expressions to prevent overwriting modified items.
   * 
   * Additionally, it generates a deterministic client request token based on the combined
   * hashes of all items to enable idempotent transactional writes, avoiding duplicate processing
   * in case of retries or cascaded calls.
   *
   * @param {ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[]} units -
   * An array of transactional write units, each containing a schema container and an item to be written.
   *
   * @returns {Promise<void>} A promise that resolves when the transaction is successfully committed.
   *
   * @throws {MaxItemsExceededError} If the number of items exceeds DynamoDB's transactional write limit.
   */
  async write(
    units: ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[],
  ): Promise<void> {
    this.validateBatchSize(units);
    this.validateKeys(units);

    const unitsWithHash = units.map((unit) => ({
      container: unit.container,
      item: {
        ...unit.item,
        hash: this.hashItem(unit.item),
      },
    }));

    const transacts = this.buildTransactItems(unitsWithHash);

    const params: TransactWriteItemsInput = {
      TransactItems: transacts,
      ClientRequestToken: this.buildClientRequestToken(unitsWithHash),
    };

    const command = new TransactWriteItemsCommand(params);

    await this.client.send(command);
  }

  /* Helpers */

  /**
   * Validates that each item in the batch conforms to the key schema
   * defined in its container.
   *
   * @private
   * @param {ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[]} units -
   * The units whose item keys will be validated.
   */
  private validateKeys(
    units: ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[],
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
   * Computes a SHA-256 hash of a DynamoDB item.
   *
   * The item is first sorted by its keys to ensure deterministic hashing,
   * then serialized to JSON and hashed. The resulting hash can be used
   * to detect changes or enforce optimistic concurrency.
   *
   * @param {Record<string, unknown>} item - The item to hash.
   * @returns {string} The hexadecimal representation of the item's SHA-256 hash.
   */
  private hashItem(item: Record<string, unknown>): string {
    const sorted = Object.keys(item)
      .sort()
      .reduce((acc, key) => {
        acc[key] = item[key];
        return acc;
      }, {} as Record<string, unknown>);

    const json = JSON.stringify(sorted);
    return createHash('sha256').update(json).digest('hex');
  }

  /**
   * Builds a list of TransactWriteItem entries with conditional expressions
   * to ensure either item creation or content hash consistency.
   *
   * @param unitsWithHash - List of units containing schema and hashed items.
   * @returns An array of TransactWriteItem ready for a DynamoDB transaction.
   */
  private buildTransactItems(
    unitsWithHash: ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[],
  ): TransactWriteItem[] {
    return unitsWithHash.map(({ container, item }) => {
      const pkName = container.getPartitionKey().name;
      const skName = container.getSortKey()?.name;
      const hasSortKey = !!skName;

      const condition = hasSortKey
        ? '(attribute_not_exists(#pk) AND attribute_not_exists(#sk)) OR contentHash = :expectedHash'
        : 'attribute_not_exists(#pk) OR contentHash = :expectedHash';

      const expressionNames: Record<string, string> = {
        '#pk': pkName,
        ...(hasSortKey && skName ? { '#sk': skName } : {}),
      };

      const expressionValues = {
        ':expectedHash': { S: item.hash },
      };

      return {
        Put: {
          TableName: container.getTableName(),
          Item: marshall(item),
          ConditionExpression: condition,
          ExpressionAttributeNames: expressionNames,
          ExpressionAttributeValues: expressionValues,
        } as TransactWriteItem,
      };
    }) as TransactWriteItem[];
  }

  /**
   * Builds a deterministic client request token by hashing the concatenation
   * of the sorted individual item hashes.
   *
   * This token can be used to ensure idempotency of transactional writes,
   * as it uniquely represents the combination of all item contents involved
   * in the transaction.
   *
   * @param unitsWithHash - Array of transactional write units, each containing
   * a schema container and an item with a precomputed content hash.
   *
   * @returns A SHA-256 hexadecimal string representing the combined hash
   * of all items in the transaction.
   */
  private buildClientRequestToken(
    unitsWithHash: ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[]
  ): string {
    const combinedHash = unitsWithHash
      .map(unit => unit.item.hash)
      .sort()
      .join('|');

    return createHash('sha256').update(combinedHash).digest('hex');
  }
}
