export interface IDatabaseSchema<K, T = any> {
    getTableName(): string;
    validateKey(input: K | T): void;
}
//# sourceMappingURL=i-database-schema.d.ts.map