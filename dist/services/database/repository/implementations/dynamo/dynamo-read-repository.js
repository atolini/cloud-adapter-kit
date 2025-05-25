import { DynamoDBClient, GetItemCommand, QueryCommand, } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
/**
 * @template T The type of item stored in the DynamoDB table.
 *
 * Repository implementation for reading data from a DynamoDB table.
 * This class uses the AWS SDK v3 for DynamoDB and supports item fetching
 * and querying using a condition builder.
 */
export class DynamoReadRepository {
    schema;
    eventLogger;
    client;
    tableName;
    /**
     * Constructs a new instance of DynamoReadRepository.
     *
     * @param schema The schema used to validate and describe the table structure.
     * @param eventLogger Logger used to track read events on the table.
     * @param region AWS region where the DynamoDB table is located.
     */
    constructor(schema, eventLogger, region) {
        this.schema = schema;
        this.eventLogger = eventLogger;
        this.client = new DynamoDBClient(region ? { region: region } : {});
        this.tableName = this.schema.getTableName();
    }
    /**
     * Fetches a single item from the table using the provided key.
     *
     * @param key The primary key used to identify the item.
     * @returns A promise that resolves to the item if found, or null if not found.
     */
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
        this.eventLogger.itemFetched(key, item);
        return item;
    }
    /**
     * Executes a query operation on the table using the provided condition.
     *
     * @param condition A condition builder that defines the query expression.
     * @param indexName Optional index name to query against a secondary index.
     * @param consistentRead Whether to use strongly consistent reads (default: false).
     * @param limit Optional limit on the number of items to return.
     * @param exclusiveStartKey Optional key to start the query from (for pagination).
     * @returns A promise that resolves to an object containing the items and an optional lastEvaluatedKey.
     */
    async query(condition, indexName, consistentRead = false, limit, exclusiveStartKey) {
        const { ConditionExpression, ExpressionAttributeNames, ExpressionAttributeValues, } = condition.build();
        const params = {
            TableName: this.tableName,
            KeyConditionExpression: ConditionExpression,
            ExpressionAttributeNames: ExpressionAttributeNames,
            ExpressionAttributeValues: ExpressionAttributeValues,
            ConsistentRead: consistentRead,
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
        this.eventLogger.queryExecuted(condition.build(), items, lastEvaluatedKey);
        return {
            items,
            lastEvaluatedKey,
        };
    }
    /**
     * Validates the given key against the schema definition.
     *
     * @param key The key to validate.
     * @throws Error if the key is invalid according to the schema.
     */
    validateKey(key) {
        this.schema.validateKey(key);
    }
}
