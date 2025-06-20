import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import { DynamoSchema } from '../../../schema/implementations/dynamo';
import { ITransactionalWriterEventLogger, ITransactionalWriterUnit } from '../../../transactional-writer/contracts';
import { ILogger } from '../../../../../utils/logger/contracts';
type LoggerOptions = {
    logSuccess?: boolean;
    logCommands?: boolean;
};
export declare class DynamoTransactionWriterEventLogger implements ITransactionalWriterEventLogger<DynamoSchema<any>, Record<string, unknown>> {
    private readonly logger;
    private readonly options;
    constructor(logger: ILogger<unknown>, options?: LoggerOptions);
    transactionSucceeded(units: ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[]): void;
    logTransactWriteCommand(command: TransactWriteItem): void;
}
export {};
//# sourceMappingURL=dynamo-transaction-writer-event-logger.d.ts.map