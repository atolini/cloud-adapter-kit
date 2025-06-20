"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoSchema = void 0;
const dynamo_1 = require("../../../../../../services/database/schema/implementations/dynamo");
class DynamoSchema {
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
            throw new dynamo_1.InvalidKeyError({
                tableName: this.tableName,
                receivedKey: key,
                expectedKey: { [field.name]: field.type },
                message: `Missing required key field "${field.name}".`,
            });
        }
        const actualType = typeof value;
        if (actualType !== field.type) {
            throw new dynamo_1.InvalidKeyError({
                tableName: this.tableName,
                receivedKey: key,
                expectedKey: { [field.name]: field.type },
                message: `Invalid type for key field "${field.name}": expected "${field.type}", got "${actualType}".`,
            });
        }
    }
    hasSortKey() {
        return this.sortKey !== undefined;
    }
    getPartitionKey() {
        return { ...this.partitionKey };
    }
    getSortKey() {
        return this.sortKey ? { ...this.sortKey } : null;
    }
}
exports.DynamoSchema = DynamoSchema;
