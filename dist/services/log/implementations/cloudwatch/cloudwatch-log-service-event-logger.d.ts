import { ILogServiceEventLogger } from '../../contracts';
import { ILogger } from '../../../../utils/logger/contracts';
export declare class CloudWatchLogServiceEventLogger implements ILogServiceEventLogger {
    private readonly logger;
    constructor(logger: ILogger<unknown>);
    logsDispatched(logGroupName: string, logStreamName: string, logCount: number): void;
}
//# sourceMappingURL=cloudwatch-log-service-event-logger.d.ts.map