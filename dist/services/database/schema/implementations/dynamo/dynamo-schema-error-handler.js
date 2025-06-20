"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoSchemaErrorHandler = void 0;
const dynamo_1 = require("../../../schema/implementations/dynamo");
class DynamoSchemaErrorHandler {
    handledErrors = new Set([dynamo_1.InvalidKeyError]);
    canHandle(error) {
        return Array.from(this.handledErrors).some((errorType) => error instanceof errorType);
    }
    handle(error, logger, resBuilder) {
        if (error instanceof dynamo_1.InvalidKeyError) {
            logger.error({
                name: error.name,
                message: error.message,
                table: error.tableName,
                expectedKey: error.expectedKey,
                receivedKey: error.receivedKey,
            });
            return resBuilder.badRequest(`Invalid key: ${error.message}`);
        }
    }
}
exports.DynamoSchemaErrorHandler = DynamoSchemaErrorHandler;
