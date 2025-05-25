/**
 * Helper class responsible for logging read-related events performed by the {@link DynamoReadRepository}.
 *
 * Logs successful item retrievals and query operations in a structured format using the provided logger instance.
 * Useful for observability, auditing, and debugging read operations on a DynamoDB table.
 *
 * @example
 * const logger = new ConsoleLogger(); // implements ILogger
 * const readLogger = new DynamoReadRepositoryEventLogger(logger, 'users-table');
 * readLogger.itemFetched({ id: '123' }, { id: '123', name: 'Alice' });
 */
export class DynamoReadRepositoryEventLogger {
    logger;
    tableName;
    /**
     * Creates an instance of DynamoReadRepositoryEventLogger.
     *
     * @param {ILogger<any>} logger - A logger instance that implements the ILogger interface.
     * @param {string} tableName - The name of the DynamoDB table being read from.
     */
    constructor(logger, tableName) {
        this.logger = logger;
        this.tableName = tableName;
    }
    /**
     * Logs an item retrieval event.
     *
     * @param {Key} key - The key used to retrieve the item.
     * @param {T | null} result - The item returned by DynamoDB, or null if not found.
     */
    itemFetched(key, result) {
        this.logger.info({
            message: result ? 'Item Retrieved' : 'Item Not Found',
            tableName: this.tableName,
            key,
            item: result,
        });
    }
    /**
     * Logs a query execution event.
     *
     * @param {DynamoConditionExpressionResult} conditions - The condition used in the query.
     * @param {T[]} results - The list of items returned by the query.
     * @param {Key | undefined} lastEvaluatedKey - The key used for pagination, if any.
     */
    queryExecuted(conditions, results, lastEvaluatedKey) {
        this.logger.info({
            message: 'Query Executed',
            tableName: this.tableName,
            condition: conditions,
            itemsReturned: results.length,
            lastEvaluatedKey,
        });
    }
}
