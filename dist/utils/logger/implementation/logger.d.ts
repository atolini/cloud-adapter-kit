import { ILogger } from '../contracts';
import { LoggerContext } from '.';
export declare class Logger implements ILogger<LoggerContext> {
    private readonly baseContext;
    constructor(contextItem?: LoggerContext);
    warn(item: object | string): void;
    error(item: object | string): void;
    info(item: object | string): void;
    private log;
}
//# sourceMappingURL=logger.d.ts.map