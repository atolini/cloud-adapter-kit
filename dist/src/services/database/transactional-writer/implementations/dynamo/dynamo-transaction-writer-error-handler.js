"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoTransactionWriterErrorHandler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
class DynamoTransactionWriterErrorHandler {
    retryableErrors = new Set([
        client_dynamodb_1.IdempotentParameterMismatchException,
        client_dynamodb_1.InternalServerError,
        client_dynamodb_1.InvalidEndpointException,
        client_dynamodb_1.ProvisionedThroughputExceededException,
        client_dynamodb_1.RequestLimitExceeded,
        client_dynamodb_1.ResourceNotFoundException,
        client_dynamodb_1.TransactionCanceledException,
        client_dynamodb_1.TransactionInProgressException,
    ]);
    canHandle(error) {
        return Array.from(this.retryableErrors).some((errorType) => error instanceof errorType);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: client_dynamodb_1.IdempotentParameterMismatchException,
                response: () => resBuilder.badRequest('Idempotent parameter mismatch. Please check the request parameters.'),
            },
            {
                type: client_dynamodb_1.InternalServerError,
                response: () => resBuilder.internalError('An internal server error occurred. Please try again later.'),
            },
            {
                type: client_dynamodb_1.InvalidEndpointException,
                response: () => resBuilder.internalError('Invalid endpoint. Please check your DynamoDB configuration.'),
            },
            {
                type: client_dynamodb_1.ProvisionedThroughputExceededException,
                response: () => resBuilder.tooManyRequests('Provisioned throughput exceeded. Please try again later.'),
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
                type: client_dynamodb_1.TransactionCanceledException,
                response: () => resBuilder.badRequest('Transaction canceled. Please check the request parameters.'),
            },
            {
                type: client_dynamodb_1.TransactionInProgressException,
                response: () => resBuilder.tooManyRequests('Transaction in progress. Please try again later.'),
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
exports.DynamoTransactionWriterErrorHandler = DynamoTransactionWriterErrorHandler;
