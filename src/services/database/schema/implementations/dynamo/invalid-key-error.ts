/**
 * @augments {Error}
 *
 * Error thrown when a provided key object does not conform to the expected schema,
 * such as missing required fields or having incorrect types.
 *
 * Typically used during key validation in database schema checks.
 *
 * @example
 * throw new InvalidKeyError({
 *   tableName: 'User',
 *   receivedKey: { usrId: '123' },
 *   expectedKey: { userId: 'string' }
 * });
 */
export class InvalidKeyError extends Error {
  public tableName: string;
  public receivedKey: Record<string, any>;
  public expectedKey: Record<string, any>;

  /**
   * Creates an instance of InvalidKeyError.
   *
   * @param {object} params
   * @param {string} params.tableName - The name of the table being validated.
   * @param {Record<string, any>} params.receivedKey - The key object that was provided but is invalid.
   * @param {Record<string, any>} params.expectedKey - The expected key object or key schema.
   * @param {string} [params.message] - Optional custom error message.
   */
  constructor({
    tableName,
    receivedKey,
    expectedKey,
    message,
  }: {
    tableName: string;
    receivedKey: Record<string, any>;
    expectedKey: Record<string, any>;
    message?: string;
  }) {
    const defaultMessage = `Invalid key provided for table "${tableName}": received ${JSON.stringify(receivedKey)}, but expected ${JSON.stringify(expectedKey)}.`;
    super(message ?? defaultMessage);
    this.name = 'InvalidKeyError';
    this.tableName = tableName;
    this.receivedKey = receivedKey;
    this.expectedKey = expectedKey;

    // Fix prototype chain for extending built-in Error
    Object.setPrototypeOf(this, InvalidKeyError.prototype);
  }
}
