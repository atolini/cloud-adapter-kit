/**
 * Helper class responsible for logging events related to the {@link CloudWatchLogService}.
 *
 * This logger captures log dispatch actions and enhances observability and debugging for log transmission to AWS CloudWatch Logs.
 */
export class CloudWatchLogServiceEventLogger {
    logger;
    /**
     * Creates an instance of CloudWatchLogServiceEventLogger.
     *
     * @param {ILogger<any>} logger - A logger instance that implements the ILogger interface.
     */
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * Logs a successful attempt to send logs to CloudWatch Logs.
     *
     * @param {string} logGroupName - The name of the CloudWatch Logs group.
     * @param {string} logStreamName - The name of the CloudWatch Logs stream.
     * @param {number} logCount - The number of log entries sent.
     */
    logsDispatched(logGroupName, logStreamName, logCount) {
        this.logger.info({
            message: 'Logs Dispatched to CloudWatch',
            logGroupName,
            logStreamName,
            logCount,
        });
    }
}
