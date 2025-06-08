import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoConditionBuilder } from '../../../condition-builder/implementations/dynamo';
import { IWriteRepository } from '../../../repository/contracts';
import { DynamoItem, DynamoWriteRepositoryEventLogger, Key } from '../../../repository/implementations/dynamo';
import { DynamoSchema } from '../../../schema/implementations/dynamo';
import { DynamoUpdateBuilder } from '../../../update-builder/implementations/dynamo';
export declare class DynamoWriteRepository<T extends DynamoItem> implements IWriteRepository<T, Key, DynamoConditionBuilder, DynamoUpdateBuilder> {
    private readonly schema;
    private readonly client;
    private readonly eventLogger?;
    private readonly tableName;
    constructor(schema: DynamoSchema<T>, client: DynamoDBClient, eventLogger?: DynamoWriteRepositoryEventLogger<T>);
    putItem(item: T): Promise<T>;
    deleteItem(key: Key): Promise<void>;
    update(update: DynamoUpdateBuilder, key: Key, condition?: DynamoConditionBuilder): Promise<T | null>;
}
//# sourceMappingURL=dynamo-write-repository.d.ts.map