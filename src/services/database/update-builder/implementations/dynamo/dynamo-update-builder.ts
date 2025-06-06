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
export class DynamoUpdateBuilder
  implements IUpdateBuilder<DynamoUpdateExpressionResult>
{
  private readonly updateExpressions: string[] = [];
  private expressionAttributeNames: Record<string, string> = {};
  private expressionAttributeValues: Record<string, any> = {};
  private index = 0;

  /**
   * Adds a SET operation to the update expression.
   *
   * @param {string} field The name of the attribute to set
   * @param {unknown} value The value to set
   * @returns {DynamoUpdateBuilder} The builder instance for chaining
   */
  set(field: string, value: unknown): this {
    return this.addUpdateExpression('SET', field, value);
  }

  /**
   * Adds a REMOVE operation to the update expression.
   *
   * @param {string} field The name of the attribute to remove
   * @returns {DynamoUpdateBuilder} The builder instance for chaining
   */
  remove(field: string): this {
    this.updateExpressions.push(`REMOVE #attr${this.index}`);
    this.expressionAttributeNames[`#attr${this.index}`] = field;
    this.index++;
    return this;
  }

  /**
   * Adds an ADD operation to the update expression, typically used to increment numeric values.
   *
   * @param {string} field The name of the attribute to add to
   * @param {number} value The numeric value to add
   * @returns {DynamoUpdateBuilder} The builder instance for chaining
   */
  add(field: string, value: number): this {
    return this.addUpdateExpression('ADD', field, value);
  }

  /**
   * Builds and returns the final update expression object,
   * ready to be used in a DynamoDB update operation.
   *
   * @returns {DynamoUpdateExpressionResult} An object containing the UpdateExpression, ExpressionAttributeNames, and ExpressionAttributeValues
   */
  build(): DynamoUpdateExpressionResult {
    return {
      UpdateExpression: this.updateExpressions.join(' '),
      ExpressionAttributeNames: this.expressionAttributeNames,
      ExpressionAttributeValues: this.expressionAttributeValues,
    };
  }

  /**
   * Adds a generic update operation (SET or ADD) to the update expression.
   *
   * @private
   * @param {'SET' | 'ADD'} type The type of update operation
   * @param {string} field The name of the attribute
   * @param {any} value The value to assign or add
   * @returns {DynamoUpdateBuilder} The builder instance for chaining
   */
  private addUpdateExpression(
    type: 'SET' | 'ADD',
    field: string,
    value: any,
  ): this {
    const fieldPlaceholder = `#attr${this.index}`;
    const valuePlaceholder = `:val${this.index}`;

    this.updateExpressions.push(
      `${type} ${fieldPlaceholder} = ${valuePlaceholder}`,
    );
    this.expressionAttributeNames[fieldPlaceholder] = field;
    this.expressionAttributeValues[valuePlaceholder] = this.formatValue(value);
    this.index++;

    return this;
  }

  /**
   * Formats a value into the structure expected by DynamoDB.
   *
   * @private
   * @param {any} value The value to format
   * @returns {object} The DynamoDB-typed value
   * @throws {Error} If the value type is not supported
   */
  private formatValue(value: any): object {
    if (typeof value === 'string') return { S: value };
    if (typeof value === 'number') return { N: value.toString() };
    if (typeof value === 'boolean') return { BOOL: value };
    throw new Error(`Unsupported value type: ${typeof value}`);
  }
}
