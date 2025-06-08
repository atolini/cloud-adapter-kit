import { ILogger } from '../../../../utils/logger/contracts';
import { IEmailMessageInput } from '../../contracts';
export declare class SESEmailServiceEventLogger {
    private readonly logger;
    constructor(logger: ILogger<unknown>);
    emailSent(message: IEmailMessageInput): void;
}
//# sourceMappingURL=ses-email-service-event-logger.d.ts.map