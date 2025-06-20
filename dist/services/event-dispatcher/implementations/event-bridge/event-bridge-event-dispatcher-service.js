"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBridgeEventDispatcherService = void 0;
const client_eventbridge_1 = require("@aws-sdk/client-eventbridge");
class EventBridgeEventDispatcherService {
    eventBusName;
    service;
    eventLogger;
    client;
    constructor(eventBusName, service, eventLogger, client) {
        this.eventBusName = eventBusName;
        this.service = service;
        this.eventLogger = eventLogger;
        this.client = client;
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
        const command = new client_eventbridge_1.PutEventsCommand({ Entries: entries });
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
exports.EventBridgeEventDispatcherService = EventBridgeEventDispatcherService;
