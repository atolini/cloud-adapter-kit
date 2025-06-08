import { InvalidKeyError, } from '../../../schema/implementations/dynamo';
export class DynamoSchema {
    tableName;
    partitionKey;
    sortKey;
    constructor(tableName, partitionKey, sortKey) {
        this.tableName = tableName;
        this.partitionKey = partitionKey;
        this.sortKey = sortKey;
    }
    getTableName() {
        return this.tableName;
    }
    validateKey(key) {
        this.validateField(this.partitionKey, key);
        if (this.sortKey) {
            this.validateField(this.sortKey, key);
        }
    }
    validateField(field, key) {
        const value = key[field.name];
        if (value === undefined) {
            throw new InvalidKeyError({
                tableName: this.tableName,
                receivedKey: key,
                expectedKey: { [field.name]: field.type },
                message: `Missing required key field "${field.name}".`,
            });
        }
        const actualType = typeof value;
        if (actualType !== field.type) {
            throw new InvalidKeyError({
                tableName: this.tableName,
                receivedKey: key,
                expectedKey: { [field.name]: field.type },
                message: `Invalid type for key field "${field.name}": expected "${field.type}", got "${actualType}".`,
            });
        }
    }
}
