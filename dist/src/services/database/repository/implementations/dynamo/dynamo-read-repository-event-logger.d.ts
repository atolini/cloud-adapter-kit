import { ILogger } from '../../../../../../utils/logger/contracts';
import { DynamoConditionExpressionResult } from '../../../../../../services/database/condition-builder/implementations/dynamo';
import { IReadRepositoryEventLogger } from '../../../../../../services/database/repository/contracts';
import { Key } from '../../../../../../services/database/repository/implementations/dynamo';
export declare class DynamoReadRepositoryEventLogger<T> implements IReadRepositoryEventLogger<T, Key, DynamoConditionExpressionResult> {
    private readonly logger;
    private readonly tableName;
    constructor(logger: ILogger<unknown>, tableName: string);
    itemFetched(key: Key, result: T | null): void;
    queryExecuted(conditions: DynamoConditionExpressionResult, results: T[], lastEvaluatedKey?: Key): void;
}
//# sourceMappingURL=dynamo-read-repository-event-logger.d.ts.map