import { ILogServiceEventLogger } from '@log/contracts';
import { ILogger } from '@logger/contracts';
/**
 * Helper class responsible for logging events related to the {@link CloudWatchLogService}.
 *
 * This logger captures log dispatch actions and enhances observability and debugging for log transmission to AWS CloudWatch Logs.
 */
export declare class CloudWatchLogServiceEventLogger implements ILogServiceEventLogger {
    private readonly logger;
    /**
     * Creates an instance of CloudWatchLogServiceEventLogger.
     *
     * @param {ILogger<any>} logger - A logger instance that implements the ILogger interface.
     */
    constructor(logger: ILogger<unknown>);
    /**
     * Logs a successful attempt to send logs to CloudWatch Logs.
     *
     * @param {string} logGroupName - The name of the CloudWatch Logs group.
     * @param {string} logStreamName - The name of the CloudWatch Logs stream.
     * @param {number} logCount - The number of log entries sent.
     */
    logsDispatched(logGroupName: string, logStreamName: string, logCount: number): void;
}
//# sourceMappingURL=cloudwatch-log-service-event-logger.d.ts.map