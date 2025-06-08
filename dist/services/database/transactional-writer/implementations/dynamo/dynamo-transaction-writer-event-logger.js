export class DynamoTransactionWriterEventLogger {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    transactionSucceeded(units) {
        this.logger.info({
            message: 'Transactional Write Succeeded',
            totalItems: units.length,
            tables: Array.from(new Set(units.map((u) => u.container.getTableName()))),
        });
    }
}
