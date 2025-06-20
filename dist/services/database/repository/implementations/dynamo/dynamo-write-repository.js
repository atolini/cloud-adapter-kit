"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoWriteRepository = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const lodash_1 = require("lodash");
class DynamoWriteRepository {
    schema;
    client;
    eventLogger;
    tableName;
    constructor(schema, client, eventLogger) {
        this.schema = schema;
        this.client = client;
        this.eventLogger = eventLogger;
        this.tableName = this.schema.getTableName();
    }
    async putItem(item) {
        this.schema.validateKey(item);
        const params = {
            TableName: this.tableName,
            Item: (0, util_dynamodb_1.marshall)(item),
        };
        const command = new client_dynamodb_1.PutItemCommand(params);
        await this.client.send(command);
        this.eventLogger?.itemCreated(item);
        return item;
    }
    async deleteItem(key) {
        this.schema.validateKey(key);
        const params = {
            TableName: this.tableName,
            Key: (0, util_dynamodb_1.marshall)(key),
        };
        const command = new client_dynamodb_1.DeleteItemCommand(params);
        await this.client.send(command);
        this.eventLogger.itemDeleted(key);
    }
    async update(update, key, condition) {
        this.schema.validateKey(key);
        const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues, } = update.build();
        const params = {
            TableName: this.tableName,
            Key: (0, util_dynamodb_1.marshall)(key),
            UpdateExpression,
            ExpressionAttributeNames,
            ExpressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        };
        if (condition) {
            const { ConditionExpression, ExpressionAttributeNames, ExpressionAttributeValues, } = condition.build();
            params.ConditionExpression = ConditionExpression;
            params.ExpressionAttributeNames = (0, lodash_1.merge)({}, params.ExpressionAttributeNames, ExpressionAttributeNames);
            params.ExpressionAttributeValues = (0, lodash_1.merge)({}, params.ExpressionAttributeValues, ExpressionAttributeValues);
        }
        const command = new client_dynamodb_1.UpdateItemCommand(params);
        const response = await this.client.send(command);
        this.eventLogger?.itemUpdated(key, update.build(), condition.build());
        return response.Attributes ? (0, util_dynamodb_1.unmarshall)(response.Attributes) : null;
    }
}
exports.DynamoWriteRepository = DynamoWriteRepository;
