import { DynamoSchema } from '@database/schema/implementations/dynamo';
import { ITransactionalWriterEventLogger, ITransactionalWriterUnit } from '@database/transactional-writer/contracts';
import { DynamoItem } from '@database/transactional-writer/implementations/dynamo';
import { ILogger } from '@logger/contracts';
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
export declare class DynamoTransactionWriterEventLogger implements ITransactionalWriterEventLogger<DynamoSchema<any>, DynamoItem> {
    private readonly logger;
    /**
     * Creates an instance of DynamoTransactionWriterEventLogger.
     *
     * @param logger - A logger instance that implements the ILogger interface.
     */
    constructor(logger: ILogger<unknown>);
    /**
     * Logs the successful completion of a transactional write.
     *
     * @param units - The write units that were successfully written.
     */
    transactionSucceeded(units: ITransactionalWriterUnit<DynamoSchema<any>, DynamoItem>[]): void;
}
//# sourceMappingURL=dynamo-transaction-writer-event-logger.d.ts.map