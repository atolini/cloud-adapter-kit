import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoConditionBuilder } from '../../../condition-builder/implementations/dynamo';
import { IReadRepository } from '../../../repository/contracts';
import { DynamoItem, DynamoReadRepositoryEventLogger, Key } from '../../../repository/implementations/dynamo';
import { DynamoSchema } from '../../../schema/implementations/dynamo';
export declare class DynamoReadRepository<T extends DynamoItem> implements IReadRepository<T, Key, DynamoConditionBuilder> {
    private readonly schema;
    private readonly client;
    private readonly eventLogger?;
    private readonly tableName;
    constructor(schema: DynamoSchema<T>, client: DynamoDBClient, eventLogger?: DynamoReadRepositoryEventLogger<T>);
    getItem(key: Key): Promise<T | null>;
    query(input: {
        condition: DynamoConditionBuilder;
        indexName?: string;
        consistentRead?: boolean;
        limit?: number;
        exclusiveStartKey?: Key;
    }): Promise<{
        items: T[];
        lastEvaluatedKey?: Key;
    }>;
    private validateKey;
}
//# sourceMappingURL=dynamo-read-repository.d.ts.map