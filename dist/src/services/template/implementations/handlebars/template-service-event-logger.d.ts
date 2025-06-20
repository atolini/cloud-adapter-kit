import { ILogger } from '../../../../../utils/logger/contracts';
import { ITemplateServiceEventLogger } from '../../../../../services/template/contracts';
export declare class TemplateServiceEventLogger implements ITemplateServiceEventLogger {
    private readonly logger;
    constructor(logger: ILogger<unknown>);
    templateInitialized(templateString: string): void;
    templateCompiled(data: Record<string, any>, result: string): void;
}
//# sourceMappingURL=template-service-event-logger.d.ts.map