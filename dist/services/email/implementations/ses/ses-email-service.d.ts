import { IEmailMessageInput, IEmailService, IEmailServiceEventLogger } from '../../contracts';
export declare class SESEmailService implements IEmailService {
    private readonly sesClient;
    private readonly defaultSender;
    private readonly eventLogger;
    constructor(defaultSender: string, eventLogger: IEmailServiceEventLogger, region?: string);
    sendEmail(message: IEmailMessageInput): Promise<void>;
}
//# sourceMappingURL=ses-email-service.d.ts.map