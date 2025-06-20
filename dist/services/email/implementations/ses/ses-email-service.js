"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESEmailService = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
class SESEmailService {
    sesClient;
    defaultSender;
    eventLogger;
    constructor(defaultSender, eventLogger, region) {
        this.sesClient = new client_ses_1.SESClient(region ? { region } : {});
        this.defaultSender = defaultSender;
        this.eventLogger = eventLogger;
    }
    async sendEmail(message) {
        const { to, subject, bodyText, bodyHtml, from } = message;
        const destination = Array.isArray(to) ? to : [to];
        const sender = from || this.defaultSender;
        message.from = sender;
        const command = new client_ses_1.SendEmailCommand({
            Source: sender,
            Destination: {
                ToAddresses: destination,
            },
            Message: {
                Subject: {
                    Data: subject,
                    Charset: 'UTF-8',
                },
                Body: {
                    Text: bodyText ? { Data: bodyText, Charset: 'UTF-8' } : undefined,
                    Html: bodyHtml ? { Data: bodyHtml, Charset: 'UTF-8' } : undefined,
                },
            },
        });
        await this.sesClient.send(command);
        this.eventLogger.emailSent(message);
    }
}
exports.SESEmailService = SESEmailService;
