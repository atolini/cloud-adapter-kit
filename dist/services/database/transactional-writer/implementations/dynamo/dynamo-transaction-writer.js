"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoTransactionWriter = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const dynamo_1 = require("../../../transactional-writer/implementations/dynamo");
class DynamoTransactionWriter {
    client;
    logger;
    maxBatchItems = 100;
    constructor(client, logger) {
        this.client = client;
        this.logger = logger;
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
        this.logger?.transactionSucceeded(units);
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
            const newVersion = crypto.randomUUID();
            if (isUpdate) {
                const condition = hasSortKey
                    ? 'attribute_exists(#pk) AND attribute_exists(#sk) AND version = :expectedVersion'
                    : 'attribute_exists(#pk) AND version = :expectedVersion';
                return {
                    Put: {
                        TableName: container.getTableName(),
                        Item: (0, util_dynamodb_1.marshall)({ ...item, version: newVersion }, { removeUndefinedValues: true }),
                        ConditionExpression: condition,
                        ExpressionAttributeNames: {
                            '#pk': pkName,
                            ...(hasSortKey && skName ? { '#sk': skName } : {}),
                        },
                        ExpressionAttributeValues: {
                            ':expectedVersion': { S: String(item.version) },
                        },
                    },
                };
            }
            const condition = hasSortKey
                ? 'attribute_not_exists(#pk) AND attribute_not_exists(#sk)'
                : 'attribute_not_exists(#pk)';
            return {
                Put: {
                    TableName: container.getTableName(),
                    Item: (0, util_dynamodb_1.marshall)({ ...item, version: newVersion }, { removeUndefinedValues: true }),
                    ConditionExpression: condition,
                    ExpressionAttributeNames: {
                        '#pk': pkName,
                        ...(hasSortKey && skName ? { '#sk': skName } : {}),
                    },
                },
            };
        });
    }
}
exports.DynamoTransactionWriter = DynamoTransactionWriter;
