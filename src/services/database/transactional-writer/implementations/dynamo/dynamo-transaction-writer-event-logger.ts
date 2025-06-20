import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import { DynamoSchema } from '@database/schema/implementations/dynamo';
import {
  ITransactionalWriterEventLogger,
  ITransactionalWriterUnit,
} from '@database/transactional-writer/contracts';
import { ILogger } from '@logger/contracts';

/**
 * Configuration options for enabling/disabling specific logs.
 */
type LoggerOptions = {
  logSuccess?: boolean;
  logCommands?: boolean;
};

/**
 * Logs the success of transactional write operations performed by the DynamoTransactionWriter.
 *
 * This logger helps trace successfully executed transactional writes for observability and auditing.
 *
 * @example
 * const logger = new Logger(); // implements ILogger
 * const transactionLogger = new DynamoTransactionWriterEventLogger(logger, { logSuccess: true });
 * transactionLogger.transactionSucceeded(units);
 */
export class DynamoTransactionWriterEventLogger
  implements ITransactionalWriterEventLogger<DynamoSchema<any>, Record<string, unknown>>
{
  private readonly logger: ILogger<unknown>;
  private readonly options: Required<LoggerOptions>;

  /**
   * Creates an instance of DynamoTransactionWriterEventLogger.
   *
   * @param logger - A logger instance that implements the ILogger interface.
   * @param options - Optional flags to enable/disable specific logs.
   */
  constructor(
    logger: ILogger<unknown>,
    options?: LoggerOptions
  ) {
    this.logger = logger;
    this.options = {
      logSuccess: options?.logSuccess ?? true,
      logCommands: options?.logCommands ?? true,
    };
  }

  /**
   * Logs the successful completion of a transactional write.
   *
   * @param units - The write units that were successfully written.
   */
  public transactionSucceeded(
    units: ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[],
  ): void {
    if (!this.options.logSuccess) return;

    this.logger.info({
      message: 'Transactional Write Succeeded',
      totalItems: units.length,
      tables: Array.from(new Set(units.map((u) => u.container.getTableName()))),
    });
  }

  /**
   * Logs the creation of a DynamoDB TransactWriteItem command.
   *
   * @param command - The transact write item to log.
   */
  public logTransactWriteCommand(command: TransactWriteItem): void {
    if (!this.options.logCommands) return;

    this.logger.info({
      message: 'Created TransactWriteCommand',
      command,
    });
  }
}
