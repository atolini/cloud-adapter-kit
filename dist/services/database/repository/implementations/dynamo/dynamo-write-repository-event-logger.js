export class DynamoWriteRepositoryEventLogger {
    logger;
    tableName;
    constructor(logger, tableName) {
        this.logger = logger;
        this.tableName = tableName;
    }
    itemCreated(item) {
        this.logger.info({
            message: 'Item Created or Replaced',
            tableName: this.tableName,
            item,
        });
    }
    itemDeleted(key) {
        this.logger.info({
            message: 'Item Deleted',
            tableName: this.tableName,
            key,
        });
    }
    itemUpdated(key, updates, conditions) {
        this.logger.info({
            message: 'Item Updated',
            tableName: this.tableName,
            key,
            updates,
            conditions,
        });
    }
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
