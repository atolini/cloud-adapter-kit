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
            throw new InvalidKeyError(`Missing required key: ${field.name}`);
        }
        const actualType = typeof value;
        if (actualType !== field.type) {
            throw new InvalidKeyError(`Invalid type for key "${field.name}". Expected "${field.type}", got "${actualType}".`);
        }
    }
}
