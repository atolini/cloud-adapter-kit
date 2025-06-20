export interface IReadRepositoryEventLogger<T, K, C> {
    itemFetched(key: K, result: T | null): void;
    queryExecuted(conditions: C, results: T[]): void;
}
//# sourceMappingURL=i-read-repository-event-logger.d.ts.map