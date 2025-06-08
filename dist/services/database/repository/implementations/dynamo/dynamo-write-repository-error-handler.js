import { ConditionalCheckFailedException, InternalServerError, InvalidEndpointException, ItemCollectionSizeLimitExceededException, ProvisionedThroughputExceededException, ReplicatedWriteConflictException, RequestLimitExceeded, ResourceNotFoundException, TransactionConflictException, } from '@aws-sdk/client-dynamodb';
import { InvalidKeyError } from '../../../schema/implementations/dynamo';
export class DynamoWriteRepositoryErrorHandler {
    handledErrors = new Set([
        ConditionalCheckFailedException,
        InternalServerError,
        InvalidEndpointException,
        ItemCollectionSizeLimitExceededException,
        ProvisionedThroughputExceededException,
        ReplicatedWriteConflictException,
        RequestLimitExceeded,
        ResourceNotFoundException,
        TransactionConflictException,
    ]);
    canHandle(error) {
        return Array.from(this.handledErrors).some((errorType) => error instanceof errorType);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: ConditionalCheckFailedException,
                response: () => resBuilder.badRequest('Conditional check failed. Please check the request parameters.'),
            },
            {
                type: InternalServerError,
                response: () => resBuilder.internalError('An internal server error occurred. Please try again later.'),
            },
            {
                type: InvalidEndpointException,
                response: () => resBuilder.internalError('Invalid endpoint. Please check your configuration.'),
            },
            {
                type: ItemCollectionSizeLimitExceededException,
                response: () => resBuilder.tooManyRequests('Item collection size limit exceeded. Please try again later.'),
            },
            {
                type: ProvisionedThroughputExceededException,
                response: () => resBuilder.tooManyRequests('Provisioned throughput exceeded. Please try again later.'),
            },
            {
                type: ReplicatedWriteConflictException,
                response: () => resBuilder.tooManyRequests('Replicated write conflict. Please try again later.'),
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
                type: TransactionConflictException,
                response: () => resBuilder.tooManyRequests('Transaction conflict. Please try again later.'),
            },
            {
                type: InvalidKeyError,
                response: () => resBuilder.badRequest('Invalid key. Please check the request parameters.'),
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
