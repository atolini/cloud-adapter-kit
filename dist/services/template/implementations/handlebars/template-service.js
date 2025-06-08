import { compile } from 'handlebars';
import { TemplateServiceEventLogger } from '../../implementations/handlebars';
export class TemplateService {
    template;
    eventsLogger;
    constructor(templateString, logger) {
        this.eventsLogger = new TemplateServiceEventLogger(logger);
        this.template = compile(templateString);
        this.eventsLogger.templateInitialized(templateString);
    }
    compile(data = {}) {
        const result = this.template(data);
        this.eventsLogger.templateCompiled(data, result);
        return result;
    }
}
