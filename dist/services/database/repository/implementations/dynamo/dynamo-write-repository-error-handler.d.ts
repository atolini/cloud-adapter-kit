import { IResponseBuilder } from '@response-builder/contracts';
import { ILogger } from '@logger/contracts';
import { IErrorActions } from '@error-handler/contracts';
/**
 * @template T - Response type
 * @template R - Response builder type
 *
 * Handles exceptions thrown during DynamoDB write operations.
 *
 * This class provides centralized error handling for the following exceptions:
 *
 * - **ConditionalCheckFailedException**: A condition specified in the operation was not met.
 * - **InternalServerError**: An internal error occurred within the AWS DynamoDB service.
 * - **InvalidEndpointException**: The endpoint provided is invalid.
 * - **ItemCollectionSizeLimitExceededException**: The item collection size limit has been exceeded.
 * - **ProvisionedThroughputExceededException**: The request exceeded the provisioned throughput for the table.
 * - **ReplicatedWriteConflictException**: A conflict occurred during a replicated write operation.
 * - **RequestLimitExceeded**: The request limit for the account has been exceeded.
 * - **ResourceNotFoundException**: The specified table or index does not exist.
 * - **TransactionConflictException**: A conflict occurred during a transactional operation.
 */
export declare class DynamoWriteErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    private readonly handledErrors;
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
//# sourceMappingURL=dynamo-write-repository-error-handler.d.ts.map