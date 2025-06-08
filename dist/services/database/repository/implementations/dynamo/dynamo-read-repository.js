import { GetItemCommand, QueryCommand, } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
export class DynamoReadRepository {
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
            Key: marshall(key),
        };
        const command = new GetItemCommand(params);
        const response = await this.client.send(command);
        const item = response.Item
            ? unmarshall(response.Item)
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
                ? marshall(exclusiveStartKey)
                : undefined,
        };
        if (indexName) {
            params.IndexName = indexName;
        }
        const command = new QueryCommand(params);
        const response = await this.client.send(command);
        const items = response.Items
            ? response.Items.map((i) => unmarshall(i))
            : [];
        const lastEvaluatedKey = response.LastEvaluatedKey
            ? unmarshall(response.LastEvaluatedKey)
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
