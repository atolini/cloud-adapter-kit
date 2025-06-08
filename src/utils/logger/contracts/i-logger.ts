/**
 * Generic logger interface that defines standard log methods.
 *
 * Implementations should provide structured logging support for different log levels.
 * Each method accepts either a string message or a flat object with additional log metadata.
 *
 * @template T - Represents the context object type to be included in log entries,
 *               typically containing identifiers like service name, request ID, etc.
 */
export interface ILogger<T> {
  /**
   * Logs a warning-level message or object.
   *
   * @param item - A string message or a flat object containing warning details.
   */
  warn(item: object | string): void;

  /**
   * Logs an error-level message or object.
   *
   * @param item - A string message or a flat object containing error details.
   */
  error(item: object | string): void;

  /**
   * Logs an informational-level message or object.
   *
   * @param item - A string message or a flat object containing informational details.
   */
  info(item: object | string): void;

  /**
   * Updates the context for subsequent log entries.
   * 
   * @param newContext - Partial context to merge into the current context.
   *                     Existing keys are overwritten by new values if present.
   */
  updateContext(newContext: Partial<T>): void;
}
