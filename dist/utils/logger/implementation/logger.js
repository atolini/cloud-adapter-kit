export class Logger {
    baseContext;
    constructor(contextItem) {
        this.baseContext = contextItem ? { ...contextItem } : {};
    }
    warn(item) {
        this.log('warn', item);
    }
    error(item) {
        this.log('error', item);
    }
    info(item) {
        this.log('info', item);
    }
    updateContext(newContext) {
        this.baseContext = { ...this.baseContext, ...newContext };
    }
    log(level, item) {
        const logEntry = {
            level,
            timestamp: new Date().toISOString(),
            ...this.baseContext,
            ...(typeof item === 'string' ? { message: item } : { details: item }),
        };
        console.log(JSON.stringify(logEntry));
    }
}
