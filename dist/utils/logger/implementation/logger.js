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
