/**
 * Contextual metadata to be included in every log entry.
 * Helps trace logs across distributed systems by providing consistent identifiers.
 *
 * @property {string} [requestId] - Optional unique identifier for the current request or operation.
 * @property {string} [service] - Optional name of the service or component generating the log.
 * @property {string} [userId] - Optional identifier of the user associated with the request.
 *
 * @example
 * const context: LoggerContext = {
 *   requestId: 'req-456',
 *   service: 'OrderService',
 *   userId: 'user-123'
 * };
 */
export type LoggerContext = {
    requestId?: string;
    service?: string;
    userId?: string;
};
//# sourceMappingURL=logger-context.d.ts.map