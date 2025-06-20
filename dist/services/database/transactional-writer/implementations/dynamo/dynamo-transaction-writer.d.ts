import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoSchema } from '../../../schema/implementations/dynamo';
import { ITransactionalWriter, ITransactionalWriterUnit } from '../../../transactional-writer/contracts';
import { DynamoTransactionWriterEventLogger } from './dynamo-transaction-writer-event-logger';
export type Units = ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[];
export declare class DynamoTransactionWriter implements ITransactionalWriter<DynamoSchema<any>, Record<string, unknown>> {
    private readonly client;
    private readonly logger?;
    private readonly maxBatchItems;
    constructor(client: DynamoDBClient, logger?: DynamoTransactionWriterEventLogger);
    write(units: Units): Promise<void>;
    private validateKeys;
    private validateBatchSize;
    private buildTransactItems;
}
//# sourceMappingURL=dynamo-transaction-writer.d.ts.map