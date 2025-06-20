export interface IWriteRepositoryEventLogger<T, K, U, C> {
    itemCreated(item: T): void;
    itemDeleted(key: K): void;
    itemUpdated(key: K, updates: U, conditions?: C): void;
    batchWritePerformed(putItems: T[], deleteKeys: K[]): void;
}
//# sourceMappingURL=i-write-repository-event-logger.d.ts.map