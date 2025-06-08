export class CloudWatchLogServiceEventLogger {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    logsDispatched(logGroupName, logStreamName, logCount) {
        this.logger.info({
            message: 'Logs Dispatched to CloudWatch',
            logGroupName,
            logStreamName,
            logCount,
        });
    }
}
