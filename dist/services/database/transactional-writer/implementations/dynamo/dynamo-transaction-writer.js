"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoTransactionWriter = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const dynamo_1 = require("../../../transactional-writer/implementations/dynamo");
const crypto_1 = require("crypto");
class DynamoTransactionWriter {
    client;
    maxBatchItems = 100;
    constructor(region) {
        this.client = new client_dynamodb_1.DynamoDBClient(region ? { region: region } : {});
    }
    async write(units) {
        this.validateBatchSize(units);
        this.validateKeys(units);
        const unitsWithHash = this.ensureItemHasHash(units);
        const transacts = this.buildTransactItems(unitsWithHash);
        const params = {
            TransactItems: transacts,
            ClientRequestToken: this.buildClientRequestToken(unitsWithHash),
        };
        const command = new client_dynamodb_1.TransactWriteItemsCommand(params);
        await this.client.send(command);
    }
    validateKeys(units) {
        for (const unit of units) {
            unit.container.validateKey(unit.item);
        }
    }
    validateBatchSize(units) {
        if (units.length > this.maxBatchItems) {
            throw new dynamo_1.MaxItemsExceededError(this.maxBatchItems);
        }
    }
    hashItem(item) {
        const sorted = Object.keys(item)
            .sort()
            .reduce((acc, key) => {
            acc[key] = item[key];
            return acc;
        }, {});
        const json = JSON.stringify(sorted);
        return (0, crypto_1.createHash)('sha256').update(json).digest('hex');
    }
    buildTransactItems(unitsWithHash) {
        return unitsWithHash.map(({ container, item }) => {
            const pkName = container.getPartitionKey().name;
            const skName = container.getSortKey()?.name;
            const hasSortKey = !!skName;
            const condition = hasSortKey
                ? '(attribute_not_exists(#pk) AND attribute_not_exists(#sk)) OR contentHash = :expectedHash'
                : 'attribute_not_exists(#pk) OR contentHash = :expectedHash';
            const expressionNames = {
                '#pk': pkName,
                ...(hasSortKey && skName ? { '#sk': skName } : {}),
            };
            const expressionValues = {
                ':expectedHash': { S: item.hash },
            };
            return {
                Put: {
                    TableName: container.getTableName(),
                    Item: (0, util_dynamodb_1.marshall)(item),
                    ConditionExpression: condition,
                    ExpressionAttributeNames: expressionNames,
                    ExpressionAttributeValues: expressionValues,
                },
            };
        });
    }
    buildClientRequestToken(unitsWithHash) {
        const combinedHash = unitsWithHash
            .map(unit => unit.item.hash)
            .sort()
            .join('|');
        return (0, crypto_1.createHash)('sha256').update(combinedHash).digest('hex');
    }
    ensureItemHasHash(units) {
        return units.map((unit) => ({
            container: unit.container,
            item: unit.item.hash
                ? unit.item
                : {
                    ...unit.item,
                    hash: this.hashItem(unit.item),
                },
        }));
    }
}
exports.DynamoTransactionWriter = DynamoTransactionWriter;
