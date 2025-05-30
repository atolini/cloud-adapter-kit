import { ILogger } from '@logger/contracts';
import { IResponseBuilder } from '@response-builder/contracts';

/**
 * Interface for defining error handling actions with generics `T` (response type) and `R` (response builder).
 * This interface defines two methods: `handle` for processing the error and `canHandle` to check if the error can be processed by the handler.
 *
 * @template T - The type of the response returned by the handler (e.g., API response type).
 * @template R - The response builder type that implements the `IApiResponse<T>` interface.
 */
export interface IErrorActions<T, R extends IResponseBuilder<T>> {
  /**
   * Handles the error by processing it and generating an appropriate response.
   *
   * @param error - The error to be handled.
   * @param logger - Logger instance for logging details of the error.
   * @param resBuilder - The response builder to construct the error response.
   * @returns The response generated by the handler.
   */
  handle(error: Error, logger: ILogger<any>, resBuilder: R): T;

  /**
   * Determines if this handler can process the provided error.
   *
   * @param error - The error to check.
   * @returns `true` if the handler can process the error, otherwise `false`.
   */
  canHandle(error: Error): boolean;
}

/**
 * Interface for an ErrorHandler that processes errors using specific handlers.
 *
 * @template T - The type of the response returned by the handler (e.g., API response type).
 * @template R - The response builder type that implements the `IResponseBuilder<T>` interface.
 */
export interface IErrorHandler<T, R extends IResponseBuilder<T>> {
  /**
   * Handles an error by delegating it to the appropriate handler.
   * If no handler is found, logs the error and returns a generic internal error response.
   *
   * @param error - The error to handle.
   * @returns The generated response.
   */
  handleError(error: Error): T;
}
