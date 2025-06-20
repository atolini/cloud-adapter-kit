"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxItemsExceededError = void 0;
class MaxItemsExceededError extends Error {
    name = 'MaxItemsExceededError';
    constructor(maxItems) {
        super(`Transaction batch exceeds the maximum allowed limit of ${maxItems} items.`);
    }
}
exports.MaxItemsExceededError = MaxItemsExceededError;
