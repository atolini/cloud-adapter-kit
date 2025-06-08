export class InvalidKeyError extends Error {
    tableName;
    receivedKey;
    expectedKey;
    constructor({ tableName, receivedKey, expectedKey, message, }) {
        const defaultMessage = `Invalid key provided for table "${tableName}": received ${JSON.stringify(receivedKey)}, but expected ${JSON.stringify(expectedKey)}.`;
        super(message ?? defaultMessage);
        this.name = 'InvalidKeyError';
        this.tableName = tableName;
        this.receivedKey = receivedKey;
        this.expectedKey = expectedKey;
        Object.setPrototypeOf(this, InvalidKeyError.prototype);
    }
}
