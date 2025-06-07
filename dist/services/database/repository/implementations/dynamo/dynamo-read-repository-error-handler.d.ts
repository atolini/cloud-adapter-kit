import { IResponseBuilder } from '@response-builder/contracts';
import { ILogger } from '@logger/contracts';
import { IErrorActions } from '@error-handler/contracts';
/**
 * @template T - Response type
 * @template R - Response builder type
 *
 * Handles a specific set of exceptions thrown during DynamoDB read operations.
 *
 * This class provides centralized error handling for the following exceptions:
 *
 * - **InternalServerError**: An internal error occurred within the AWS DynamoDB service.
 * - **InvalidEndpointException**: The endpoint provided is invalid.
 * - **ProvisionedThroughputExceededException**: The request exceeded the provisioned throughput for the table.
 * - **RequestLimitExceeded**: The request limit for the account has been exceeded.
 * - **ResourceNotFoundException**: The specified table or index does not exist.
 */
export declare class DynamoReadRepositoryErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    private readonly retryableErrors;
    /**
     * Checks if the provided error is one of the handled DynamoDB exceptions.
     *
     * @param error - The error to check.
     * @returns True if the error can be handled by this handler, false otherwise.
     */
    canHandle(error: Error): boolean;
    /**
     * Handles the provided error by logging it and returning an appropriate response using the response builder.
     *
     * @param error - The error to handle.
     * @param logger - The logger instance used to log the error details.
     * @param resBuilder - The response builder used to generate the response.
     * @returns The response generated for the handled error.
     */
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=dynamo-read-repository-error-handler.d.ts.map