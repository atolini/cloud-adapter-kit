import { ILogger } from '../../../../utils/logger/contracts';
import { LoggerContext } from '.';
export declare class Logger implements ILogger<LoggerContext> {
    private baseContext;
    constructor(contextItem?: LoggerContext);
    warn(item: object | string): void;
    error(item: object | string): void;
    info(item: object | string): void;
    updateContext(newContext: Partial<LoggerContext>): void;
    private log;
}
//# sourceMappingURL=logger.d.ts.map