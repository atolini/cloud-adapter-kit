/**
 * @augments {Error}
 *
 * Error thrown when a provided key does not conform to the expected schema,
 * such as missing required fields or having incorrect types.
 *
 * Typically used during key validation in database schema checks.
 *
 * @example
 * throw new InvalidKeyError('Missing required key: userId');
 */
export declare class InvalidKeyError extends Error {
    /**
     * Creates an instance of InvalidKeyError.
     *
     * @param {string} message - A descriptive error message indicating the validation issue.
     */
    constructor(message: string);
}
//# sourceMappingURL=invalid-key-error.d.ts.map