"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoTransactionWriterEventLogger = void 0;
class DynamoTransactionWriterEventLogger {
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
exports.DynamoTransactionWriterEventLogger = DynamoTransactionWriterEventLogger;
