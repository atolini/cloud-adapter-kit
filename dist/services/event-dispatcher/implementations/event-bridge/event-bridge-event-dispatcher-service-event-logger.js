/**
 *
 * Logger class responsible for logging to the console the events published by an EventBridgeEventDispatcherService implementation.
 *
 * Provides simple structured logs for single or batch event publishing actions, mainly for debugging or development purposes.
 *
 * @example
 * const logger = new Logger<Context>({...}); // implements ILogger
 * const eventLogger = new EventBridgeEventDispatcherServiceEventLogger(logger);
 * eventLogger.eventPublished({ event: new UserCreatedEvent(...), requestId: 'abc-123' }, 'my-event-bus');
 */
export class EventBridgeEventDispatcherServiceEventLogger {
    logger;
    /**
     * Constructs a new EventBridgeServiceEventLogger.
     *
     * @param logger - The logger instance used to log event information.
     */
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * Logs a single event dispatch.
     *
     * @param event - The event metadata and domain event instance.
     * @param transport - The transport mechanism used for publishing the event.
     */
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
    /**
     * Logs multiple event dispatches.
     *
     * @param events - An array of event metadata and domain event instances.
     * @param transport - The transport mechanism used for publishing the events.
     */
    batchEventsPublished(events, transport) {
        events.forEach((event) => this.eventPublished(event, transport));
    }
}
