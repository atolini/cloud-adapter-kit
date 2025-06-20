"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateServiceEventLogger = void 0;
class TemplateServiceEventLogger {
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
exports.TemplateServiceEventLogger = TemplateServiceEventLogger;
