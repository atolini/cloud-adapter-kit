import { DynamoSchema } from '../../../schema/implementations/dynamo';
import { ITransactionalWriter, ITransactionalWriterUnit } from '../../../transactional-writer/contracts';
export type Units = ITransactionalWriterUnit<DynamoSchema<any>, Record<string, unknown>>[];
export declare class DynamoTransactionWriter implements ITransactionalWriter<DynamoSchema<any>, Record<string, unknown>> {
    private readonly client;
    private readonly maxBatchItems;
    constructor(region?: string);
    write(units: Units): Promise<void>;
    private validateKeys;
    private validateBatchSize;
    private buildTransactItems;
}
//# sourceMappingURL=dynamo-transaction-writer.d.ts.map