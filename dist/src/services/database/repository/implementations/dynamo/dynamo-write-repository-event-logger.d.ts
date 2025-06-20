import { DynamoConditionExpressionResult } from '../../../../../../services/database/condition-builder/implementations/dynamo';
import { IWriteRepositoryEventLogger } from '../../../../../../services/database/repository/contracts';
import { Key } from '../../../../../../services/database/repository/implementations/dynamo';
import { DynamoUpdateExpressionResult } from '../../../../../../services/database/update-builder/implementations/dynamo';
import { ILogger } from '../../../../../../utils/logger/contracts';
export declare class DynamoWriteRepositoryEventLogger<T> implements IWriteRepositoryEventLogger<T, Key, DynamoUpdateExpressionResult, DynamoConditionExpressionResult> {
    private readonly logger;
    private readonly tableName;
    constructor(logger: ILogger<unknown>, tableName: string);
    itemCreated(item: T): void;
    itemDeleted(key: Key): void;
    itemUpdated(key: Key, updates: DynamoUpdateExpressionResult, conditions?: Record<string, unknown>): void;
    batchWritePerformed(putItems: T[], deleteKeys: Key[], unprocessedItems?: Array<{
        type: 'put' | 'delete';
        item: T | Key;
    }>): void;
}
//# sourceMappingURL=dynamo-write-repository-event-logger.d.ts.map