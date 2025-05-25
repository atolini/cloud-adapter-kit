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
export class DynamoWriteRepositoryEventLogger {
    logger;
    tableName;
    /**
     * Creates an instance of DynamoWriteRepositoryEventLogger.
     *
     * @param logger - A logger instance that implements the ILogger interface.
     * @param tableName - The name of the DynamoDB table being written to.
     */
    constructor(logger, tableName) {
        this.logger = logger;
        this.tableName = tableName;
    }
    /**
     * Logs a single item creation or replacement event.
     * @param item - The item that was put into the table.
     */
    itemCreated(item) {
        this.logger.info({
            message: 'Item Created or Replaced',
            tableName: this.tableName,
            item,
        });
    }
    /**
     * Logs a deletion event.
     * @param key - The key of the item that was deleted.
     */
    itemDeleted(key) {
        this.logger.info({
            message: 'Item Deleted',
            tableName: this.tableName,
            key,
        });
    }
    /**
     * Logs an update event.
     * @param key - The key of the item being updated.
     * @param updates - The update expression object.
     * @param conditions - (Optional) Conditions applied to the update.
     */
    itemUpdated(key, updates, conditions) {
        this.logger.info({
            message: 'Item Updated',
            tableName: this.tableName,
            key,
            updates,
            conditions,
        });
    }
    /**
     * Logs a batch write operation.
     * @param putItems - Items that were inserted or replaced.
     * @param deleteKeys - Keys of items that were deleted.
     * @param unprocessedItems - (Optional) Items that were not processed in the batch.
     */
    batchWritePerformed(putItems, deleteKeys, unprocessedItems) {
        this.logger.info({
            message: 'Batch Write Operation',
            tableName: this.tableName,
            putItems,
            deleteKeys,
            unprocessedItems: unprocessedItems ?? [],
        });
    }
}
