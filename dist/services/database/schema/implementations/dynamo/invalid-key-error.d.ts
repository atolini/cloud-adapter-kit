export declare class InvalidKeyError extends Error {
    tableName: string;
    receivedKey: Record<string, any>;
    expectedKey: Record<string, any>;
    constructor({ tableName, receivedKey, expectedKey, message, }: {
        tableName: string;
        receivedKey: Record<string, any>;
        expectedKey: Record<string, any>;
        message?: string;
    });
}
//# sourceMappingURL=invalid-key-error.d.ts.map