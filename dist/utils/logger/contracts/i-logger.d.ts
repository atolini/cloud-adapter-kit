export interface ILogger<T> {
    warn(item: object | string): void;
    error(item: object | string): void;
    info(item: object | string): void;
    updateContext(newContext: Partial<T>): void;
}
//# sourceMappingURL=i-logger.d.ts.map