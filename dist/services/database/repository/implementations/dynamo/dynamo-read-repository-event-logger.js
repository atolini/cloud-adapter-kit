"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoReadRepositoryEventLogger = void 0;
class DynamoReadRepositoryEventLogger {
    logger;
    tableName;
    constructor(logger, tableName) {
        this.logger = logger;
        this.tableName = tableName;
    }
    itemFetched(key, result) {
        this.logger.info({
            message: result ? 'Item Retrieved' : 'Item Not Found',
            tableName: this.tableName,
            key,
            item: result,
        });
    }
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
exports.DynamoReadRepositoryEventLogger = DynamoReadRepositoryEventLogger;
