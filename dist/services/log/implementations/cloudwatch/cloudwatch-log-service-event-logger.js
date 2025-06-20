"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudWatchLogServiceEventLogger = void 0;
class CloudWatchLogServiceEventLogger {
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
exports.CloudWatchLogServiceEventLogger = CloudWatchLogServiceEventLogger;
