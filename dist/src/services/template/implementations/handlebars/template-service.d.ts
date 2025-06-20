import { ITemplateService } from '../../../../../services/template/contracts';
import { ILogger } from '../../../../../utils/logger/contracts';
export declare class TemplateService implements ITemplateService {
    private readonly template;
    private readonly eventsLogger;
    constructor(templateString: string, logger: ILogger<unknown>);
    compile(data?: Record<string, any>): string;
}
//# sourceMappingURL=template-service.d.ts.map