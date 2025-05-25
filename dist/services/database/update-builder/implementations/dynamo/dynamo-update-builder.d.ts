import { IUpdateBuilder } from '@database/update-builder/contracts';
import { DynamoUpdateExpressionResult } from '@database/update-builder/implementations/dynamo';
/**
 *
 * A utility class for building DynamoDB update expressions dynamically.
 *
 * This class allows you to compose operations such as SET, REMOVE, and ADD
 * to update attributes in a DynamoDB item. It automatically handles placeholders
 * for attribute names and values.
 *
 * It outputs a ready-to-use structure compatible with DynamoDB update operations.
 *
 * @example
 * // Example usage:
 * const builder = new DynamoUpdateBuilder();
 * const update = builder
 *   .set('username', 'john_doe')
 *   .remove('user_age')
 *   .add('login_count', 1)
 *   .build();
 *
 * // Result:
 * // {
 * //   UpdateExpression: "SET #attr0 = :val0 REMOVE #attr1 ADD #attr2 = :val2",
 * //   ExpressionAttributeNames: { "#attr0": "username", "#attr1": "user_age", "#attr2": "login_count" },
 * //   ExpressionAttributeValues: { ":val0": { S: "john_doe" }, ":val2": { N: "1" } }
 * // }
 */
export declare class DynamoUpdateBuilder implements IUpdateBuilder<DynamoUpdateExpressionResult> {
    private readonly updateExpressions;
    private expressionAttributeNames;
    private expressionAttributeValues;
    private index;
    /**
     * Adds a SET operation to the update expression.
     *
     * @param {string} field The name of the attribute to set
     * @param {unknown} value The value to set
     * @returns {DynamoUpdateBuilder} The builder instance for chaining
     */
    set(field: string, value: unknown): this;
    /**
     * Adds a REMOVE operation to the update expression.
     *
     * @param {string} field The name of the attribute to remove
     * @returns {DynamoUpdateBuilder} The builder instance for chaining
     */
    remove(field: string): this;
    /**
     * Adds an ADD operation to the update expression, typically used to increment numeric values.
     *
     * @param {string} field The name of the attribute to add to
     * @param {number} value The numeric value to add
     * @returns {DynamoUpdateBuilder} The builder instance for chaining
     */
    add(field: string, value: number): this;
    /**
     * Builds and returns the final update expression object,
     * ready to be used in a DynamoDB update operation.
     *
     * @returns {DynamoUpdateExpressionResult} An object containing the UpdateExpression, ExpressionAttributeNames, and ExpressionAttributeValues
     */
    build(): DynamoUpdateExpressionResult;
    /**
     * Adds a generic update operation (SET or ADD) to the update expression.
     *
     * @private
     * @param {'SET' | 'ADD'} type The type of update operation
     * @param {string} field The name of the attribute
     * @param {any} value The value to assign or add
     * @returns {DynamoUpdateBuilder} The builder instance for chaining
     */
    private addUpdateExpression;
    /**
     * Formats a value into the structure expected by DynamoDB.
     *
     * @private
     * @param {any} value The value to format
     * @returns {object} The DynamoDB-typed value
     * @throws {Error} If the value type is not supported
     */
    private formatValue;
}
//# sourceMappingURL=dynamo-update-builder.d.ts.map