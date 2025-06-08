import { DeleteItemCommand, PutItemCommand, UpdateItemCommand, } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { merge } from 'lodash';
export class DynamoWriteRepository {
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
            Item: marshall(item),
        };
        const command = new PutItemCommand(params);
        await this.client.send(command);
        this.eventLogger?.itemCreated(item);
        return item;
    }
    async deleteItem(key) {
        this.schema.validateKey(key);
        const params = {
            TableName: this.tableName,
            Key: marshall(key),
        };
        const command = new DeleteItemCommand(params);
        await this.client.send(command);
        this.eventLogger.itemDeleted(key);
    }
    async update(update, key, condition) {
        this.schema.validateKey(key);
        const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues, } = update.build();
        const params = {
            TableName: this.tableName,
            Key: marshall(key),
            UpdateExpression,
            ExpressionAttributeNames,
            ExpressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        };
        if (condition) {
            const { ConditionExpression, ExpressionAttributeNames, ExpressionAttributeValues, } = condition.build();
            params.ConditionExpression = ConditionExpression;
            params.ExpressionAttributeNames = merge({}, params.ExpressionAttributeNames, ExpressionAttributeNames);
            params.ExpressionAttributeValues = merge({}, params.ExpressionAttributeValues, ExpressionAttributeValues);
        }
        const command = new UpdateItemCommand(params);
        const response = await this.client.send(command);
        this.eventLogger?.itemUpdated(key, update.build(), condition.build());
        return response.Attributes ? unmarshall(response.Attributes) : null;
    }
}
