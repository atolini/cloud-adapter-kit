import { DynamoSchema } from '@database/schema/implementations/dynamo';
import { ITransactionalWriter, ITransactionalWriterUnit } from '@database/transactional-writer/contracts';
import { DynamoItem } from '@database/transactional-writer/implementations/dynamo';
/**
 *
 * Provides a transactional writer implementation for DynamoDB using AWS SDK.
 * It handles writing multiple items in a single atomic transaction and performs
 * validation on batch size and item keys.
 */
export declare class DynamoTransactionWriter implements ITransactionalWriter<DynamoSchema<any>, DynamoItem> {
    private readonly client;
    private readonly maxBatchItems;
    /**
     * Creates a new instance of DynamoTransactionWrite.
     *
     * @param {string} [region] - Optional AWS region. If not provided, uses default SDK configuration.
     */
    constructor(region?: string);
    /**
     * Writes a batch of items to DynamoDB transactionally.
     * Validates the batch size and item keys before sending the transaction.
     *
     * @param {ITransactionalWriterUnit<DynamoSchema<any>, DynamoItem>[]} units -
     * An array of transactional write units, each containing a schema container and an item to be written.
     *
     * @returns {Promise<void>} - A promise that resolves when the transaction is completed.
     *
     * @throws {MaxItemsExceededError} - If the number of items exceeds DynamoDB's transactional limit.
     */
    write(units: ITransactionalWriterUnit<DynamoSchema<any>, DynamoItem>[]): Promise<void>;
    /**
     * Validates that each item in the batch conforms to the key schema
     * defined in its container.
     *
     * @private
     * @param {ITransactionalWriterUnit<DynamoSchema<any>, DynamoItem>[]} units -
     * The units whose item keys will be validated.
     */
    private validateKeys;
    /**
     * Validates that the number of items in the batch does not exceed
     * DynamoDB's transactional write limit.
     *
     * @private
     * @param {any[]} units - The list of units to be written.
     *
     * @throws {MaxItemsExceededError} - If the number of units exceeds the allowed limit.
     */
    private validateBatchSize;
}
//# sourceMappingURL=dynamo-transaction-writer.d.ts.map