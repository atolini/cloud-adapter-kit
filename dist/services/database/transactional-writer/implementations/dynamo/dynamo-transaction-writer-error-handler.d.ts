import { IErrorActions } from '@error-handler/contracts';
import { ILogger } from '@logger/contracts';
import { IResponseBuilder } from '@response-builder/contracts';
/**
 * @template T - Response type
 * @template R - Response builder type
 *
 * Handles specific exceptions thrown within the {@link DynamoTransactionWrite} class during DynamoDB transactional operations.
 *
 * This class provides centralized error handling for the following DynamoDB exceptions:
 *
 * - {@link IdempotentParameterMismatchException}: Retry with a mismatched client token and parameters.
 * - {@link InternalServerError}: An internal error occurred within the AWS DynamoDB service.
 * - {@link InvalidEndpointException}: The DynamoDB endpoint is incorrect or unavailable.
 * - {@link ProvisionedThroughputExceededException}: The request exceeded the provisioned throughput for the table.
 * - {@link RequestLimitExceeded}: The request limit for the account has been exceeded.
 * - {@link ResourceNotFoundException}: The specified table or index does not exist.
 * - {@link TransactionCanceledException}: The transaction was canceled.
 * - {@link TransactionInProgressException}: Another transaction is currently in progress.
 */
export declare class DynamoTransactionWriterErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    private readonly retryableErrors;
    /**
     * Checks if the provided error is one of the handled DynamoDB exceptions.
     *
     * @param error - The error to check.
     * @returns {boolean} True if the error can be handled by this handler, false otherwise.
     */
    canHandle(error: Error): boolean;
    /**
     * Handles the provided error by logging it and returning an appropriate response using the response builder.
     *
     * @param error - The error to handle.
     * @param logger - The logger instance used to log the error details.
     * @param resBuilder - The response builder used to generate the response.
     * @returns {T} The response generated for the handled error.
     */
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=dynamo-transaction-writer-error-handler.d.ts.map