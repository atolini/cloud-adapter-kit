import { ILogger } from '@logger/contracts';
import { IResponseBuilder } from '@response-builder/contracts';
import { IErrorActions } from '@error-handler/contracts';
/**
 * @template T - Response type
 * @template R - Response builder type
 *
 * Handles specific exceptions thrown within the {@link SESEmailService} class during email sending operations with AWS SES.
 *
 * This class provides centralized error handling for the following SES exceptions:
 *
 * - {@link AccountSendingPausedException}: If the Amazon SES account is paused from sending emails.
 * - {@link ConfigurationSetDoesNotExistException}: If the specified configuration set does not exist.
 * - {@link ConfigurationSetSendingPausedException}: If the specified configuration set is paused from sending emails.
 * - {@link MailFromDomainNotVerifiedException}: If the sender's email address is not verified with Amazon SES.
 * - {@link MessageRejected}: If the email message is rejected by Amazon SES.
 */
export declare class SESEmailServiceErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    /**
     * Checks if the provided error is one of the handled SES exceptions.
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
//# sourceMappingURL=ses-email-service-error-handler.d.ts.map