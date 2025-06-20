"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoWriteRepositoryErrorHandler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
class DynamoWriteRepositoryErrorHandler {
    handledErrors = new Set([
        client_dynamodb_1.ConditionalCheckFailedException,
        client_dynamodb_1.InternalServerError,
        client_dynamodb_1.InvalidEndpointException,
        client_dynamodb_1.ItemCollectionSizeLimitExceededException,
        client_dynamodb_1.ProvisionedThroughputExceededException,
        client_dynamodb_1.ReplicatedWriteConflictException,
        client_dynamodb_1.RequestLimitExceeded,
        client_dynamodb_1.ResourceNotFoundException,
        client_dynamodb_1.TransactionConflictException,
    ]);
    canHandle(error) {
        return Array.from(this.handledErrors).some((errorType) => error instanceof errorType);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: client_dynamodb_1.ConditionalCheckFailedException,
                response: () => resBuilder.badRequest('Conditional check failed. Please check the request parameters.'),
            },
            {
                type: client_dynamodb_1.InternalServerError,
                response: () => resBuilder.internalError('An internal server error occurred. Please try again later.'),
            },
            {
                type: client_dynamodb_1.InvalidEndpointException,
                response: () => resBuilder.internalError('Invalid endpoint. Please check your configuration.'),
            },
            {
                type: client_dynamodb_1.ItemCollectionSizeLimitExceededException,
                response: () => resBuilder.tooManyRequests('Item collection size limit exceeded. Please try again later.'),
            },
            {
                type: client_dynamodb_1.ProvisionedThroughputExceededException,
                response: () => resBuilder.tooManyRequests('Provisioned throughput exceeded. Please try again later.'),
            },
            {
                type: client_dynamodb_1.ReplicatedWriteConflictException,
                response: () => resBuilder.tooManyRequests('Replicated write conflict. Please try again later.'),
            },
            {
                type: client_dynamodb_1.RequestLimitExceeded,
                response: () => resBuilder.tooManyRequests('Request limit exceeded. Please try again later.'),
            },
            {
                type: client_dynamodb_1.ResourceNotFoundException,
                response: () => resBuilder.notFound('The specified resource was not found.'),
            },
            {
                type: client_dynamodb_1.TransactionConflictException,
                response: () => resBuilder.tooManyRequests('Transaction conflict. Please try again later.'),
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
exports.DynamoWriteRepositoryErrorHandler = DynamoWriteRepositoryErrorHandler;
