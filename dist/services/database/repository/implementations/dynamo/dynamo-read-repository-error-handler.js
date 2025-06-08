import { InternalServerError, InvalidEndpointException, ProvisionedThroughputExceededException, RequestLimitExceeded, ResourceNotFoundException, } from '@aws-sdk/client-dynamodb';
import { InvalidKeyError } from '../../../schema/implementations/dynamo';
export class DynamoReadRepositoryErrorHandler {
    retryableErrors = new Set([
        InternalServerError,
        InvalidEndpointException,
        ProvisionedThroughputExceededException,
        RequestLimitExceeded,
        ResourceNotFoundException,
    ]);
    canHandle(error) {
        return Array.from(this.retryableErrors).some((errorType) => error instanceof errorType);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: InternalServerError,
                log: {},
                response: () => resBuilder.internalError('An internal server error occurred. Please try again later.'),
            },
            {
                type: InvalidEndpointException,
                log: {},
                response: () => resBuilder.internalError('Invalid endpoint. Please check your configuration.'),
            },
            {
                type: ProvisionedThroughputExceededException,
                log: {},
                response: () => resBuilder.tooManyRequests('Provisioned throughput exceeded. Please try again later.'),
            },
            {
                type: RequestLimitExceeded,
                log: {},
                response: () => resBuilder.tooManyRequests('Request limit exceeded. Please try again later.'),
            },
            {
                type: ResourceNotFoundException,
                log: {},
                response: () => resBuilder.notFound('The specified resource was not found.'),
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
