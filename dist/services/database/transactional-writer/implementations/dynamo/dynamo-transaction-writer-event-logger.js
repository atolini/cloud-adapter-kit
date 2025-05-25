/**
 * Logs the success of transactional write operations performed by the DynamoTransactionWriter.
 *
 * This logger helps trace successfully executed transactional writes for observability and auditing.
 *
 * @example
 * const logger = new Logger(); // implements ILogger
 * const transactionLogger = new DynamoTransactionWriterEventLogger(logger);
 * transactionLogger.transactionSucceeded(units);
 */
export class DynamoTransactionWriterEventLogger {
    logger;
    /**
     * Creates an instance of DynamoTransactionWriterEventLogger.
     *
     * @param logger - A logger instance that implements the ILogger interface.
     */
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * Logs the successful completion of a transactional write.
     *
     * @param units - The write units that were successfully written.
     */
    transactionSucceeded(units) {
        this.logger.info({
            message: 'Transactional Write Succeeded',
            totalItems: units.length,
            tables: Array.from(new Set(units.map((u) => u.container.getTableName()))),
        });
    }
}
