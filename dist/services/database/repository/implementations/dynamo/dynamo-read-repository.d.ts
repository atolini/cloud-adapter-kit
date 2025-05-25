import { DynamoConditionBuilder } from '@database/condition-builder/implementations/dynamo';
import { IReadRepository } from '@database/repository/contracts';
import { DynamoItem, DynamoReadRepositoryEventLogger, Key } from '@database/repository/implementations/dynamo';
import { DynamoSchema } from '@database/schema/implementations/dynamo';
/**
 * @template T The type of item stored in the DynamoDB table.
 *
 * Repository implementation for reading data from a DynamoDB table.
 * This class uses the AWS SDK v3 for DynamoDB and supports item fetching
 * and querying using a condition builder.
 */
export declare class DynamoReadRepository<T extends DynamoItem> implements IReadRepository<T, Key, DynamoConditionBuilder> {
    private readonly schema;
    private readonly eventLogger;
    private readonly client;
    private readonly tableName;
    /**
     * Constructs a new instance of DynamoReadRepository.
     *
     * @param schema The schema used to validate and describe the table structure.
     * @param eventLogger Logger used to track read events on the table.
     * @param region AWS region where the DynamoDB table is located.
     */
    constructor(schema: DynamoSchema<T>, eventLogger: DynamoReadRepositoryEventLogger<T>, region: string);
    /**
     * Fetches a single item from the table using the provided key.
     *
     * @param key The primary key used to identify the item.
     * @returns A promise that resolves to the item if found, or null if not found.
     */
    getItem(key: Key): Promise<T | null>;
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
    query(condition: DynamoConditionBuilder, indexName?: string, consistentRead?: boolean, limit?: number, exclusiveStartKey?: Key): Promise<{
        items: T[];
        lastEvaluatedKey?: Key;
    }>;
    /**
     * Validates the given key against the schema definition.
     *
     * @param key The key to validate.
     * @throws Error if the key is invalid according to the schema.
     */
    private validateKey;
}
//# sourceMappingURL=dynamo-read-repository.d.ts.map