import { ILogService, ILogServiceEventLogger } from '../../contracts';
import { LogContainer } from '.';
export declare class CloudWatchLogService<T> implements ILogService<T, LogContainer> {
    private readonly eventLogger;
    private readonly client;
    constructor(eventLogger: ILogServiceEventLogger, region?: string);
    putLog(logs: T[], logContainerId: LogContainer): Promise<void>;
}
//# sourceMappingURL=cloudwatch-log-service.d.ts.map