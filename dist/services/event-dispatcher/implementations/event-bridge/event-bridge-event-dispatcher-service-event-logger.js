"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBridgeEventDispatcherServiceEventLogger = void 0;
class EventBridgeEventDispatcherServiceEventLogger {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    eventPublished(event, transport) {
        const { requestId, userId, event: domainEvent } = event;
        this.logger.info({
            message: 'Domain Event Published',
            eventBusName: transport,
            eventType: domainEvent.getType(),
            timestamp: domainEvent.getCreatedAt().toISOString(),
            payload: domainEvent.getEvent(),
            requestId,
            userId,
        });
    }
    batchEventsPublished(events, transport) {
        events.forEach((event) => this.eventPublished(event, transport));
    }
}
exports.EventBridgeEventDispatcherServiceEventLogger = EventBridgeEventDispatcherServiceEventLogger;
