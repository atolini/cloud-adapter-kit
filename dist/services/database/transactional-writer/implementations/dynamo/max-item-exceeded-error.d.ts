/**
 * Thrown when the number of transactional write items exceeds the allowed DynamoDB limit.
 *
 * DynamoDB supports a maximum of 100 items in a single `TransactWriteItems` operation.
 */
export declare class MaxItemsExceededError extends Error {
    readonly name = "MaxItemsExceededError";
    /**
     * @param {number} maxItems - The maximum number of allowed items.
     */
    constructor(maxItems: number);
}
//# sourceMappingURL=max-item-exceeded-error.d.ts.map