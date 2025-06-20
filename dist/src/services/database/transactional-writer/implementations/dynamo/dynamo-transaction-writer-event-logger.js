"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoTransactionWriterEventLogger = void 0;
class DynamoTransactionWriterEventLogger {
    logger;
    options;
    constructor(logger, options) {
        this.logger = logger;
        this.options = {
            logSuccess: options?.logSuccess ?? true,
            logCommands: options?.logCommands ?? true,
        };
    }
    transactionSucceeded(units) {
        if (!this.options.logSuccess)
            return;
        this.logger.info({
            message: 'Transactional Write Succeeded',
            totalItems: units.length,
            tables: Array.from(new Set(units.map((u) => u.container.getTableName()))),
        });
    }
    logTransactWriteCommand(command) {
        if (!this.options.logCommands)
            return;
        this.logger.info({
            message: 'Created TransactWriteCommand',
            command,
        });
    }
}
exports.DynamoTransactionWriterEventLogger = DynamoTransactionWriterEventLogger;
