/**
 * Helper class responsible for logging template-related events performed by the {@link TemplateService}.
 *
 * Logs compilation and initialization of templates in a structured format using the provided logger instance.
 *
 * This logger focuses on capturing key template usage events for observability and debugging.
 *
 * @example
 * const logger = new ConsoleLogger(); // implements ILogger
 * const eventLogger = new TemplateEventLogger(logger);
 * eventLogger.templateInitialized('<h1>{{title}}</h1>');
 * eventLogger.templateCompiled({ title: 'Hello' });
 */
export class TemplateServiceEventLogger {
    logger;
    /**
     * Creates an instance of TemplateEventLogger.
     *
     * @param {ILogger<any>} logger - A logger instance that implements the ILogger interface.
     */
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * Logs an event when a template is initialized.
     *
     * @param {string} templateString - The raw Handlebars template string that was compiled.
     */
    templateInitialized(templateString) {
        this.logger.info({
            message: 'Template Initialized',
            templatePreview: templateString.slice(0, 100), // preview only first 100 chars
        });
    }
    /**
     * Logs an event when a template is compiled with data.
     *
     * @param {Record<string, any>} data - The data used to compile the template.
     * @param {string} result - The resulting string after compilation.
     */
    templateCompiled(data, result) {
        this.logger.info({
            message: 'Template Compiled',
            inputData: data,
            resultPreview: result.slice(0, 100), // preview only first 100 chars
        });
    }
}
