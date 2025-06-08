import { DynamoSchema } from '../../../schema/implementations/dynamo';
import { ITransactionalWriterEventLogger, ITransactionalWriterUnit } from '../../../transactional-writer/contracts';
import { ILogger } from '../../../../../utils/logger/contracts';
export declare class DynamoTransactionWriterEventLogger implements ITransactionalWriterEventLogger<DynamoSchema<any>, Record<string, unknown>> {
    private readonly logger;
    constructor(logger: ILogger<unknown>);
    transactionSucceeded(units: ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[]): void;
}
//# sourceMappingURL=dynamo-transaction-writer-event-logger.d.ts.map