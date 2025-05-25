import { ILogger } from '@logger/contracts';
import { IResponseBuilder } from '@response-builder/contracts';
import { IErrorActions } from '@error-handler/contracts';
/**
 * @template T - Response type
 * @template R - Response builder type
 *
 * Handles exceptions thrown within the {@link CloudWatchLogService} class.
 *
 * This class is responsible for identifying and handling specific AWS CloudWatch
 * logging-related errors and returning meaningful HTTP responses using a response builder.
 *
 * The following exceptions may be handled by this class:
 * - **DataAlreadyAcceptedException**: If the logs are already accepted.
 * - **InvalidParameterException**: If the parameters are invalid.
 * - **InvalidSequenceTokenException**: If the sequence token is invalid.
 * - **ResourceNotFoundException**: If the specified log group or log stream does not exist.
 * - **ServiceUnavailableException**: If the service is unavailable.
 * - **UnrecognizedClientException**: If the client is unrecognized.
 */
export declare class CloudWatchLogServiceErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    /**
     * Checks if the provided error can be handled by this error handler.
     *
     * @param {Error} error - The error object thrown during log submission.
     * @returns {boolean} Returns `true` if the error is one of the known CloudWatch log-related exceptions.
     */
    canHandle(error: Error): boolean;
    /**
     * Handles the provided error by logging its details and returning an appropriate response using the response builder.
     *
     * @param {Error} error - The error to handle.
     * @param {ILogger<any>} logger - Logger instance used to log error details.
     * @param {R} resBuilder - Response builder used to construct the final response.
     * @returns {T} A structured response indicating the error condition.
     *
     */
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=cloudwatch-log-service-error-handler.d.ts.map