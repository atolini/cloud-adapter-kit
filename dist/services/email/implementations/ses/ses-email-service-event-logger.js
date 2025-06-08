export class SESEmailServiceEventLogger {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    emailSent(message) {
        this.logger.info({
            message: 'Email Sent',
            sender: message.from || 'undefined',
            recipients: Array.isArray(message.to) ? message.to : [message.to],
            subject: message.subject,
        });
    }
}
