import { IConditionBuilder } from '@database/condition-builder/contracts';
import { DynamoConditionExpressionResult } from '@database/condition-builder/implementations/dynamo';
/**
 *
 * A utility class for building DynamoDB condition expressions dynamically.
 *
 * This class allows you to compose conditions such as equality, inequality, greater than, and less than,
 * and combine them using logical operators like AND and OR.
 *
 * It outputs a ready-to-use structure compatible with DynamoDB queries.
 *
 * @example
 * const builder = new DynamoConditionBuilder();
 * const condition = builder
 *   .eq('status', 'ACTIVE')
 *   .and()
 *   .gt('age', 18)
 *   .build();
 *
 * // Result:
 * // {
 * //   ConditionExpression: "#attr0 = :val0 AND #attr1 > :val1",
 * //   ExpressionAttributeNames: { "#attr0": "status", "#attr1": "age" },
 * //   ExpressionAttributeValues: { ":val0": { S: "ACTIVE" }, ":val1": { N: "18" } }
 * // }
 */
export declare class DynamoConditionBuilder implements IConditionBuilder<DynamoConditionExpressionResult> {
    private readonly expressions;
    private attributeNames;
    private attributeValues;
    private index;
    /**
     * Adds an equality condition (field = value).
     *
     * @param {string} field The name of the attribute to compare
     * @param {string | number | boolean} value The expected value
     * @returns {DynamoConditionBuilder} The builder instance for chaining
     */
    eq(field: string, value: string | number | boolean): this;
    /**
     * Adds a not-equal condition (field <> value).
     *
     * @param {string} field The name of the attribute to compare
     * @param {string | number | boolean} value The value to compare against
     * @returns {DynamoConditionBuilder} The builder instance for chaining
     */
    ne(field: string, value: string | number | boolean): this;
    /**
     * Adds a greater-than condition (field > value).
     *
     * @param {string} field The name of the attribute to compare
     * @param {string | number} value The value to compare against
     * @returns {DynamoConditionBuilder} The builder instance for chaining
     */
    gt(field: string, value: string | number): this;
    /**
     * Adds a less-than condition (field < value).
     *
     * @param {string} field The name of the attribute to compare
     * @param {string | number} value The value to compare against
     * @returns {DynamoConditionBuilder} The builder instance for chaining
     */
    lt(field: string, value: string | number): this;
    /**
     * Combines the previous conditions using the AND logical operator.
     *
     * @returns {DynamoConditionBuilder} The builder instance for chaining
     */
    and(): this;
    /**
     * Combines the previous conditions using the OR logical operator.
     *
     * @returns {DynamoConditionBuilder} The builder instance for chaining
     */
    or(): this;
    /**
     * Builds and returns the final condition expression object,
     * ready to be used in a DynamoDB query or update operation.
     *
     * @returns {ConditionExpressionResult} The assembled condition expression, attribute names, and attribute values
     */
    build(): DynamoConditionExpressionResult;
    /**
     * Adds a generic condition with a given operator between a field and a value.
     *
     * @private
     * @param {string} field The name of the attribute
     * @param {string} operator The comparison operator (e.g., '=', '<>', '>', '<')
     * @param {any} value The value to compare against
     * @returns {DynamoConditionBuilder} The builder instance for chaining
     */
    private addCondition;
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
//# sourceMappingURL=dynamo-condition-builder.d.ts.map