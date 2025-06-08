import { InvalidKeyError } from '@database/schema/implementations/dynamo';
import { IResponseBuilder } from '@response-builder/contracts';
import { ILogger } from '@logger/contracts';
import { IErrorActions } from '@error-handler/contracts';

/**
 * @template T - Response type
 * @template R - Response builder type
 *
 * Handles schema-related exceptions thrown during DynamoDB key validation.
 *
 * This class provides centralized error handling for the following exception:
 *
 * - **InvalidKeyError**: Thrown when a required key field is missing or has an incorrect type.
 */
export class DynamoSchemaErrorHandler<T, R extends IResponseBuilder<T>>
  implements IErrorActions<T, R>
{
  private readonly handledErrors = new Set([InvalidKeyError]);

  /**
   * Checks if the provided error is an instance of a known schema validation error.
   *
   * @param error - The error to check.
   * @returns True if the error can be handled by this handler, false otherwise.
   */
  canHandle(error: Error): boolean {
    return Array.from(this.handledErrors).some(
      (errorType) => error instanceof errorType,
    );
  }

  /**
   * Handles the provided schema validation error by logging it and returning an appropriate response.
   *
   * @param error - The error to handle.
   * @param logger - The logger instance used to log the error details.
   * @param resBuilder - The response builder used to generate the response.
   * @returns The response generated for the handled error.
   */
  handle(error: Error, logger: ILogger<any>, resBuilder: R): T {
    if (error instanceof InvalidKeyError) {
      logger.error({
        name: error.name,
        message: error.message,
        table: error.tableName,
        expectedKey: error.expectedKey,
        receivedKey: error.receivedKey,
      });

      return resBuilder.badRequest(
        `Invalid key: ${error.message}`,
      );
    }
  }
}
