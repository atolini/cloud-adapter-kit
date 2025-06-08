export class TemplateServiceEventLogger {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    templateInitialized(templateString) {
        this.logger.info({
            message: 'Template Initialized',
            templatePreview: templateString.slice(0, 100),
        });
    }
    templateCompiled(data, result) {
        this.logger.info({
            message: 'Template Compiled',
            inputData: data,
            resultPreview: result.slice(0, 100),
        });
    }
}
