import { ILogger } from '../../../../../utils/logger/contracts';
import { DynamoConditionExpressionResult } from '../../../condition-builder/implementations/dynamo';
import { IReadRepositoryEventLogger } from '../../../repository/contracts';
import { Key } from '../../../repository/implementations/dynamo';
export declare class DynamoReadRepositoryEventLogger<T> implements IReadRepositoryEventLogger<T, Key, DynamoConditionExpressionResult> {
    private readonly logger;
    private readonly tableName;
    constructor(logger: ILogger<unknown>, tableName: string);
    itemFetched(key: Key, result: T | null): void;
    queryExecuted(conditions: DynamoConditionExpressionResult, results: T[], lastEvaluatedKey?: Key): void;
}
//# sourceMappingURL=dynamo-read-repository-event-logger.d.ts.map