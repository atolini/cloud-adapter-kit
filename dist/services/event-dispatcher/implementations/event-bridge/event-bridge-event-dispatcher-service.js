import { EventBridgeClient, PutEventsCommand, } from '@aws-sdk/client-eventbridge';
export class EventBridgeEventDispatcherService {
    eventBusName;
    service;
    eventLogger;
    client;
    constructor(eventBusName, service, eventLogger, region) {
        this.eventBusName = eventBusName;
        this.service = service;
        this.eventLogger = eventLogger;
        this.client = new EventBridgeClient(region ? { region } : {});
    }
    async publish(event) {
        const entry = this.toEventBridgeEntry(event);
        await this.sendCommand([entry]);
        this.eventLogger.eventPublished(event, this.eventBusName);
    }
    async publishAll(events) {
        const entries = events.map((event) => this.toEventBridgeEntry(event));
        await this.sendCommand(entries);
        this.eventLogger.batchEventsPublished(events, this.eventBusName);
    }
    async sendCommand(entries) {
        const command = new PutEventsCommand({ Entries: entries });
        await this.client.send(command);
    }
    toEventBridgeEntry(event) {
        const e = event.event;
        const eventType = e.getType();
        const eventDetail = e.getEvent();
        const eventDate = e.getCreatedAt();
        const requestId = event.requestId;
        const userId = event.userId ? event.userId : undefined;
        return {
            EventBusName: this.eventBusName,
            Source: this.service,
            DetailType: eventType,
            Time: eventDate,
            Detail: JSON.stringify({ ...eventDetail, requestId, userId }),
        };
    }
}
