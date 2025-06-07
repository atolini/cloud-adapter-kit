import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoConditionBuilder } from '@database/condition-builder/implementations/dynamo';
import { IWriteRepository } from '@database/repository/contracts';
import { DynamoItem, DynamoWriteRepositoryEventLogger, Key } from '@database/repository/implementations/dynamo';
import { DynamoSchema } from '@database/schema/implementations/dynamo';
import { DynamoUpdateBuilder } from '@database/update-builder/implementations/dynamo';
/**
 * @template T - The type of item managed by the repository, which extends DynamoItem.
 *
 * Repository implementation for writing data to a DynamoDB table.
 * Handles create, update, and delete operations.
 */
export declare class DynamoWriteRepository<T extends DynamoItem> implements IWriteRepository<T, Key, DynamoConditionBuilder, DynamoUpdateBuilder> {
    private readonly schema;
    private readonly client;
    private readonly eventLogger?;
    private readonly tableName;
    /**
     * Creates a new instance of DynamoWriteRepository.
     *
     * @param schema - The schema that defines the structure and validation of the items.
     * @param client The DynamoDB client used to interact with the table.
     * @param eventLogger - (Optional) Logger for tracking repository events such as creation, update, and deletion.
     */
    constructor(schema: DynamoSchema<T>, client: DynamoDBClient, eventLogger?: DynamoWriteRepositoryEventLogger<T>);
    /**
     * Inserts a new item into the DynamoDB table.
     *
     * @param item - The item to be inserted.
     * @returns The inserted item.
     */
    putItem(item: T): Promise<T>;
    /**
     * Deletes an item from the DynamoDB table based on the provided key.
     *
     * @param key - The primary key of the item to be deleted.
     * @returns A promise that resolves when the item is deleted.
     */
    deleteItem(key: Key): Promise<void>;
    /**
     * Updates an existing item in the DynamoDB table.
     *
     * @param update - The update expression builder containing the update operations.
     * @param key - The primary key of the item to be updated.
     * @param condition - Optional condition expression builder to enforce update constraints.
     * @returns The updated item or null if the item was not found.
     */
    update(update: DynamoUpdateBuilder, key: Key, condition?: DynamoConditionBuilder): Promise<T | null>;
}
//# sourceMappingURL=dynamo-write-repository.d.ts.map