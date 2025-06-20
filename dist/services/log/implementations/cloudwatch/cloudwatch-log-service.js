"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudWatchLogService = void 0;
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
class CloudWatchLogService {
    eventLogger;
    client;
    constructor(eventLogger, region) {
        this.eventLogger = eventLogger;
        this.client = new client_cloudwatch_logs_1.CloudWatchLogsClient(region ? { region } : {});
    }
    async putLog(logs, logContainerId) {
        const { logGroupName, logStreamName } = logContainerId;
        const describeRes = await this.client.send(new client_cloudwatch_logs_1.DescribeLogStreamsCommand({
            logGroupName,
            logStreamNamePrefix: logStreamName,
        }));
        const logStream = describeRes.logStreams?.find((stream) => stream.logStreamName === logStreamName);
        const sequenceToken = logStream?.uploadSequenceToken;
        const logEvents = logs.map((log) => ({
            message: typeof log === 'string' ? log : JSON.stringify(log),
            timestamp: Date.now(),
        }));
        await this.client.send(new client_cloudwatch_logs_1.PutLogEventsCommand({
            logEvents,
            logGroupName,
            logStreamName,
            sequenceToken,
        }));
        this.eventLogger.logsDispatched(logGroupName, logStreamName, logs.length);
    }
}
exports.CloudWatchLogService = CloudWatchLogService;
