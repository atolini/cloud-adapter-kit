import { IDatabaseSchema } from '@database/schema/contracts';
import { KeyConfig } from '@database/schema/implementations/dynamo';
/**
 * @template T - The full object type that includes key attributes and possibly additional data.
 *
 * Represents the schema definition for a DynamoDB-compatible table, including the table name
 * and key configuration (partition and optional sort key). It provides runtime validation to ensure
 * that the required key fields exist and match the expected types, either from a plain key object
 * or a full entity that contains the key attributes.
 *
 * @example
 * const schema = new DynamoSchema(
 *   'UsersTable',
 *   { name: 'userId', type: 'string' },
 *   { name: 'createdAt', type: 'number' }
 * );
 *
 * schema.getTableName(); // returns 'UsersTable'
 * schema.validateKey({ userId: 'abc123', createdAt: 1692451820 }); // passes
 */
export declare class DynamoSchema<T> implements IDatabaseSchema<Record<string, unknown>, T> {
    private readonly tableName;
    private readonly partitionKey;
    private readonly sortKey?;
    /**
     * Creates an instance of DynamoSchema.
     *
     * @param {string} tableName - The name of the table.
     * @param {KeyConfig} partitionKey - Configuration for the partition (hash) key.
     * @param {KeyConfig} [sortKey] - Optional configuration for the sort (range) key.
     */
    constructor(tableName: string, partitionKey: KeyConfig, sortKey?: KeyConfig);
    /**
     * Retrieves the configured table name.
     *
     * @returns {string} The name of the table.
     */
    getTableName(): string;
    /**
     * Validates that the given object contains the required key fields
     * with the correct types as defined in the schema.
     *
     * Accepts either a plain key object or a full entity that includes the key attributes.
     * Ensures presence and type correctness of the partition key and, if applicable, the sort key.
     *
     * @param {Key | T} key - Object to validate. May be just the key or a full entity with key attributes.
     * @throws {InvalidKeyError} If any required key field is missing or has an incorrect type.
     */
    validateKey(key: Record<string, unknown> | T): void;
    /**
     * Validates a single key field for presence and expected type.
     *
     * @private
     * @param {KeyConfig} field - The configuration of the key field to validate.
     * @param {Key | T} key - The object being validated.
     * @throws {InvalidKeyError} If the field is missing or has an incorrect type.
     */
    private validateField;
}
//# sourceMappingURL=dynamo-schema.d.ts.map