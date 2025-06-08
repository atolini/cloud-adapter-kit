import { CloudWatchLogsClient, DescribeLogStreamsCommand, PutLogEventsCommand, } from '@aws-sdk/client-cloudwatch-logs';
export class CloudWatchLogService {
    eventLogger;
    client;
    constructor(eventLogger, region) {
        this.eventLogger = eventLogger;
        this.client = new CloudWatchLogsClient(region ? { region } : {});
    }
    async putLog(logs, logContainerId) {
        const { logGroupName, logStreamName } = logContainerId;
        const describeRes = await this.client.send(new DescribeLogStreamsCommand({
            logGroupName,
            logStreamNamePrefix: logStreamName,
        }));
        const logStream = describeRes.logStreams?.find((stream) => stream.logStreamName === logStreamName);
        const sequenceToken = logStream?.uploadSequenceToken;
        const logEvents = logs.map((log) => ({
            message: typeof log === 'string' ? log : JSON.stringify(log),
            timestamp: Date.now(),
        }));
        await this.client.send(new PutLogEventsCommand({
            logEvents,
            logGroupName,
            logStreamName,
            sequenceToken,
        }));
        this.eventLogger.logsDispatched(logGroupName, logStreamName, logs.length);
    }
}
