import { MessageRejected, MailFromDomainNotVerifiedException, ConfigurationSetDoesNotExistException, AccountSendingPausedException, ConfigurationSetSendingPausedException, } from '@aws-sdk/client-ses';
export class SESEmailServiceErrorHandler {
    canHandle(error) {
        return (error instanceof AccountSendingPausedException ||
            error instanceof ConfigurationSetDoesNotExistException ||
            error instanceof ConfigurationSetSendingPausedException ||
            error instanceof MailFromDomainNotVerifiedException ||
            error instanceof MessageRejected);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: AccountSendingPausedException,
                log: {},
                response: () => resBuilder.internalError(),
            },
            {
                type: ConfigurationSetDoesNotExistException,
                log: {},
                response: () => resBuilder.internalError(),
            },
            {
                type: ConfigurationSetSendingPausedException,
                log: {},
                response: () => resBuilder.internalError(),
            },
            {
                type: MailFromDomainNotVerifiedException,
                log: {},
                response: () => resBuilder.internalError(),
            },
            {
                type: MessageRejected,
                log: {},
                response: () => resBuilder.internalError(),
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
