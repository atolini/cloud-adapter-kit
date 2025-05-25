import { DynamoConditionExpressionResult } from '@database/condition-builder/implementations/dynamo';
import { IWriteRepositoryEventLogger } from '@database/repository/contracts';
import { Key } from '@database/repository/implementations/dynamo';
import { DynamoUpdateExpressionResult } from '@database/update-builder/implementations/dynamo';
import { ILogger } from '@logger/contracts';
/**
 * Logs structured events related to write operations on a DynamoDB table using DynamoWriteRepository.
 *
 * This logger captures `putItem`, `update`, `deleteItem`, and `batchWriteItems` operations
 * for observability, audit trails, and debugging.
 *
 * @example
 * const logger = new Logger<Context>({...}); // implements ILogger
 * const eventLogger = new DynamoWriteRepositoryEventLogger(logger, 'HiringRequestTable');
 * eventLogger.itemCreated({ id: '123', name: 'Test' });
 * eventLogger.itemDeleted({ id: '123' });
 * eventLogger.itemUpdated({ id: '123' }, updateExpression, conditions);
 * eventLogger.batchWritePerformed([{ id: '1' }], [{ id: '2' }], [{ type: 'put', item: { id: '1' } }]);
 */
export declare class DynamoWriteRepositoryEventLogger<T> implements IWriteRepositoryEventLogger<T, Key, DynamoUpdateExpressionResult, DynamoConditionExpressionResult> {
    private readonly logger;
    private readonly tableName;
    /**
     * Creates an instance of DynamoWriteRepositoryEventLogger.
     *
     * @param logger - A logger instance that implements the ILogger interface.
     * @param tableName - The name of the DynamoDB table being written to.
     */
    constructor(logger: ILogger<unknown>, tableName: string);
    /**
     * Logs a single item creation or replacement event.
     * @param item - The item that was put into the table.
     */
    itemCreated(item: T): void;
    /**
     * Logs a deletion event.
     * @param key - The key of the item that was deleted.
     */
    itemDeleted(key: Key): void;
    /**
     * Logs an update event.
     * @param key - The key of the item being updated.
     * @param updates - The update expression object.
     * @param conditions - (Optional) Conditions applied to the update.
     */
    itemUpdated(key: Key, updates: DynamoUpdateExpressionResult, conditions?: Record<string, unknown>): void;
    /**
     * Logs a batch write operation.
     * @param putItems - Items that were inserted or replaced.
     * @param deleteKeys - Keys of items that were deleted.
     * @param unprocessedItems - (Optional) Items that were not processed in the batch.
     */
    batchWritePerformed(putItems: T[], deleteKeys: Key[], unprocessedItems?: Array<{
        type: 'put' | 'delete';
        item: T | Key;
    }>): void;
}
//# sourceMappingURL=dynamo-write-repository-event-logger.d.ts.map