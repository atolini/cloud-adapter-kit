import { DynamoSchema } from '../../../schema/implementations/dynamo';
import { ITransactionalWriter, ITransactionalWriterUnit } from '../../../transactional-writer/contracts';
export declare class DynamoTransactionWriter implements ITransactionalWriter<DynamoSchema<any>, Record<string, unknown>> {
    private readonly client;
    private readonly maxBatchItems;
    constructor(region?: string);
    write(units: ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[]): Promise<void>;
    private validateKeys;
    private validateBatchSize;
}
//# sourceMappingURL=dynamo-transaction-writer.d.ts.map