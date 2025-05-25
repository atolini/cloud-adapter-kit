import { DeleteItemCommand, DynamoDBClient, PutItemCommand, UpdateItemCommand, } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { merge } from 'lodash';
/**
 * @template T - The type of item managed by the repository, which extends DynamoItem.
 *
 * Repository implementation for writing data to a DynamoDB table.
 * Handles create, update, and delete operations.
 */
export class DynamoWriteRepository {
    schema;
    eventLogger;
    client;
    tableName;
    /**
     * Creates a new instance of DynamoWriteRepository.
     *
     * @param schema - The schema that defines the structure and validation of the items.
     * @param eventLogger - Logger for tracking repository events such as creation, update, and deletion.
     * @param region - AWS region to configure the DynamoDB client.
     */
    constructor(schema, eventLogger, region) {
        this.schema = schema;
        this.eventLogger = eventLogger;
        this.client = new DynamoDBClient(region ? { region: region } : {});
        this.tableName = this.schema.getTableName();
    }
    /**
     * Inserts a new item into the DynamoDB table.
     *
     * @param item - The item to be inserted.
     * @returns The inserted item.
     */
    async putItem(item) {
        this.schema.validateKey(item);
        const params = {
            TableName: this.tableName,
            Item: marshall(item),
        };
        const command = new PutItemCommand(params);
        await this.client.send(command);
        this.eventLogger.itemCreated(item);
        return item;
    }
    /**
     * Deletes an item from the DynamoDB table based on the provided key.
     *
     * @param key - The primary key of the item to be deleted.
     * @returns A promise that resolves when the item is deleted.
     */
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
    /**
     * Updates an existing item in the DynamoDB table.
     *
     * @param update - The update expression builder containing the update operations.
     * @param key - The primary key of the item to be updated.
     * @param condition - Optional condition expression builder to enforce update constraints.
     * @returns The updated item or null if the item was not found.
     */
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
        this.eventLogger.itemUpdated(key, update.build(), condition.build());
        return response.Attributes ? unmarshall(response.Attributes) : null;
    }
}
