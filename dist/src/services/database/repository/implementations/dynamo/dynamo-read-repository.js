"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoReadRepository = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
class DynamoReadRepository {
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
    async getItem(key) {
        this.validateKey(key);
        const params = {
            TableName: this.tableName,
            Key: (0, util_dynamodb_1.marshall)(key),
        };
        const command = new client_dynamodb_1.GetItemCommand(params);
        const response = await this.client.send(command);
        const item = response.Item
            ? (0, util_dynamodb_1.unmarshall)(response.Item)
            : null;
        this.eventLogger?.itemFetched(key, item);
        return item;
    }
    async query(input) {
        const { condition, indexName, consistentRead, limit, exclusiveStartKey } = input;
        const { ConditionExpression, ExpressionAttributeNames, ExpressionAttributeValues, } = condition.build();
        const params = {
            TableName: this.tableName,
            KeyConditionExpression: ConditionExpression,
            ExpressionAttributeNames: ExpressionAttributeNames,
            ExpressionAttributeValues: ExpressionAttributeValues,
            ConsistentRead: consistentRead ?? false,
            Limit: limit,
            ExclusiveStartKey: exclusiveStartKey
                ? (0, util_dynamodb_1.marshall)(exclusiveStartKey)
                : undefined,
        };
        if (indexName) {
            params.IndexName = indexName;
        }
        const command = new client_dynamodb_1.QueryCommand(params);
        const response = await this.client.send(command);
        const items = response.Items
            ? response.Items.map((i) => (0, util_dynamodb_1.unmarshall)(i))
            : [];
        const lastEvaluatedKey = response.LastEvaluatedKey
            ? (0, util_dynamodb_1.unmarshall)(response.LastEvaluatedKey)
            : undefined;
        this.eventLogger?.queryExecuted(condition.build(), items, lastEvaluatedKey);
        return {
            items,
            lastEvaluatedKey,
        };
    }
    validateKey(key) {
        this.schema.validateKey(key);
    }
}
exports.DynamoReadRepository = DynamoReadRepository;
