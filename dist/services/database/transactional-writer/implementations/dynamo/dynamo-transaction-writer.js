"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoTransactionWriter = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const dynamo_1 = require("../../../transactional-writer/implementations/dynamo");
class DynamoTransactionWriter {
    client;
    maxBatchItems = 100;
    constructor(region) {
        this.client = new client_dynamodb_1.DynamoDBClient(region ? { region: region } : {});
    }
    async write(units) {
        this.validateBatchSize(units);
        this.validateKeys(units);
        const transacts = this.buildTransactItems(units);
        const params = {
            TransactItems: transacts,
            ClientRequestToken: crypto.randomUUID(),
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
    buildTransactItems(units) {
        return units.map(({ container, item }) => {
            const pkName = container.getPartitionKey().name;
            const skName = container.getSortKey()?.name;
            const hasSortKey = container.hasSortKey();
            const isUpdate = !!item.version;
            const condition = isUpdate
                ? hasSortKey
                    ? '(attribute_not_exists(#pk) AND attribute_not_exists(#sk)) OR version = :expectedVersion'
                    : 'attribute_not_exists(#pk) OR version = :expectedVersion'
                : hasSortKey
                    ? 'attribute_not_exists(#pk) AND attribute_not_exists(#sk)'
                    : 'attribute_not_exists(#pk)';
            const expressionNames = {
                '#pk': pkName,
                ...(hasSortKey && skName ? { '#sk': skName } : {}),
            };
            const expressionValues = isUpdate
                ? {
                    ':expectedVersion': { S: String(item.version) },
                }
                : undefined;
            item.version = crypto.randomUUID();
            return {
                Put: {
                    TableName: container.getTableName(),
                    Item: (0, util_dynamodb_1.marshall)(item, { removeUndefinedValues: true }),
                    ConditionExpression: condition,
                    ExpressionAttributeNames: expressionNames,
                    ...(expressionValues && { ExpressionAttributeValues: expressionValues }),
                },
            };
        });
    }
}
exports.DynamoTransactionWriter = DynamoTransactionWriter;
