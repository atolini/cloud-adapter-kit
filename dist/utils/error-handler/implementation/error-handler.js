export class ErrorHandler {
    handlers;
    logger;
    resBuilder;
    constructor(resBuilder, logger, handlers) {
        this.resBuilder = resBuilder;
        this.logger = logger;
        this.handlers = handlers;
    }
    handleError(error) {
        const handler = this.handlers.find((h) => h.canHandle(error));
        if (handler) {
            return handler.handle(error, this.logger, this.resBuilder);
        }
        this.logger.error({
            description: 'An unexpected error occurred. Please check the application logs for more details.',
            message: error.message,
            name: error.name,
            error: error,
        });
        return this.resBuilder.internalError('Unhandled error');
    }
}
