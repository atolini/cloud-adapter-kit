"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESEmailServiceErrorHandler = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
class SESEmailServiceErrorHandler {
    canHandle(error) {
        return (error instanceof client_ses_1.AccountSendingPausedException ||
            error instanceof client_ses_1.ConfigurationSetDoesNotExistException ||
            error instanceof client_ses_1.ConfigurationSetSendingPausedException ||
            error instanceof client_ses_1.MailFromDomainNotVerifiedException ||
            error instanceof client_ses_1.MessageRejected);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: client_ses_1.AccountSendingPausedException,
                log: {},
                response: () => resBuilder.internalError(),
            },
            {
                type: client_ses_1.ConfigurationSetDoesNotExistException,
                log: {},
                response: () => resBuilder.internalError(),
            },
            {
                type: client_ses_1.ConfigurationSetSendingPausedException,
                log: {},
                response: () => resBuilder.internalError(),
            },
            {
                type: client_ses_1.MailFromDomainNotVerifiedException,
                log: {},
                response: () => resBuilder.internalError(),
            },
            {
                type: client_ses_1.MessageRejected,
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
exports.SESEmailServiceErrorHandler = SESEmailServiceErrorHandler;
