import { IdempotentParameterMismatchException, InternalServerError, InvalidEndpointException, ProvisionedThroughputExceededException, RequestLimitExceeded, ResourceNotFoundException, TransactionCanceledException, TransactionInProgressException, } from '@aws-sdk/client-dynamodb';
export class DynamoTransactionWriterErrorHandler {
    retryableErrors = new Set([
        IdempotentParameterMismatchException,
        InternalServerError,
        InvalidEndpointException,
        ProvisionedThroughputExceededException,
        RequestLimitExceeded,
        ResourceNotFoundException,
        TransactionCanceledException,
        TransactionInProgressException,
    ]);
    canHandle(error) {
        return Array.from(this.retryableErrors).some((errorType) => error instanceof errorType);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: IdempotentParameterMismatchException,
                response: () => resBuilder.badRequest('Idempotent parameter mismatch. Please check the request parameters.'),
            },
            {
                type: InternalServerError,
                response: () => resBuilder.internalError('An internal server error occurred. Please try again later.'),
            },
            {
                type: InvalidEndpointException,
                response: () => resBuilder.internalError('Invalid endpoint. Please check your DynamoDB configuration.'),
            },
            {
                type: ProvisionedThroughputExceededException,
                response: () => resBuilder.tooManyRequests('Provisioned throughput exceeded. Please try again later.'),
            },
            {
                type: RequestLimitExceeded,
                response: () => resBuilder.tooManyRequests('Request limit exceeded. Please try again later.'),
            },
            {
                type: ResourceNotFoundException,
                response: () => resBuilder.notFound('The specified resource was not found.'),
            },
            {
                type: TransactionCanceledException,
                response: () => resBuilder.badRequest('Transaction canceled. Please check the request parameters.'),
            },
            {
                type: TransactionInProgressException,
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
