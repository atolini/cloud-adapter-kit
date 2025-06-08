export class MaxItemsExceededError extends Error {
    name = 'MaxItemsExceededError';
    constructor(maxItems) {
        super(`Transaction batch exceeds the maximum allowed limit of ${maxItems} items.`);
    }
}
