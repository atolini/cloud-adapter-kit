"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoReadRepositoryErrorHandler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
class DynamoReadRepositoryErrorHandler {
    retryableErrors = new Set([
        client_dynamodb_1.InternalServerError,
        client_dynamodb_1.InvalidEndpointException,
        client_dynamodb_1.ProvisionedThroughputExceededException,
        client_dynamodb_1.RequestLimitExceeded,
        client_dynamodb_1.ResourceNotFoundException,
    ]);
    canHandle(error) {
        return Array.from(this.retryableErrors).some((errorType) => error instanceof errorType);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: client_dynamodb_1.InternalServerError,
                log: {},
                response: () => resBuilder.internalError('An internal server error occurred. Please try again later.'),
            },
            {
                type: client_dynamodb_1.InvalidEndpointException,
                log: {},
                response: () => resBuilder.internalError('Invalid endpoint. Please check your configuration.'),
            },
            {
                type: client_dynamodb_1.ProvisionedThroughputExceededException,
                log: {},
                response: () => resBuilder.tooManyRequests('Provisioned throughput exceeded. Please try again later.'),
            },
            {
                type: client_dynamodb_1.RequestLimitExceeded,
                log: {},
                response: () => resBuilder.tooManyRequests('Request limit exceeded. Please try again later.'),
            },
            {
                type: client_dynamodb_1.ResourceNotFoundException,
                log: {},
                response: () => resBuilder.notFound('The specified resource was not found.'),
            },
        ];
        for (const entry of errorMap) {
            if (error instanceof entry.type) {
                logger.error({
                    name: error.name,
                    message: error.message,
                });
                return entry.response();
            }
        }
    }
}
exports.DynamoReadRepositoryErrorHandler = DynamoReadRepositoryErrorHandler;
