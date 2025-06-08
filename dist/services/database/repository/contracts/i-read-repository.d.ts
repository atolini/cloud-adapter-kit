import { IConditionBuilder } from '../../condition-builder/contracts';
export interface IReadRepository<T, K, C extends IConditionBuilder<any>> {
    getItem(key: K): Promise<T | null>;
    query(input: {
        condition: C;
        indexName?: string;
    }): Promise<{
        items: T[];
        lastEvaluatedKey?: K;
    } | null>;
}
//# sourceMappingURL=i-read-repository.d.ts.map