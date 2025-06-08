import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
export class SESEmailService {
    sesClient;
    defaultSender;
    eventLogger;
    constructor(defaultSender, eventLogger, region) {
        this.sesClient = new SESClient(region ? { region } : {});
        this.defaultSender = defaultSender;
        this.eventLogger = eventLogger;
    }
    async sendEmail(message) {
        const { to, subject, bodyText, bodyHtml, from } = message;
        const destination = Array.isArray(to) ? to : [to];
        const sender = from || this.defaultSender;
        message.from = sender;
        const command = new SendEmailCommand({
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
