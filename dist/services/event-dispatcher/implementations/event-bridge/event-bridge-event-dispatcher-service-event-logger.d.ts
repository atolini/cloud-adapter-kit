import { IEventDispatcherServiceEventLogger } from '@event-dispatcher/contracts';
import { ILogger } from '@logger/contracts';
import { EventWrapper } from '.';
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
export declare class EventBridgeEventDispatcherServiceEventLogger implements IEventDispatcherServiceEventLogger<EventWrapper> {
    private readonly logger;
    /**
     * Constructs a new EventBridgeServiceEventLogger.
     *
     * @param logger - The logger instance used to log event information.
     */
    constructor(logger: ILogger<any>);
    /**
     * Logs a single event dispatch.
     *
     * @param event - The event metadata and domain event instance.
     * @param transport - The transport mechanism used for publishing the event.
     */
    eventPublished(event: EventWrapper, transport: string): void;
    /**
     * Logs multiple event dispatches.
     *
     * @param events - An array of event metadata and domain event instances.
     * @param transport - The transport mechanism used for publishing the events.
     */
    batchEventsPublished(events: EventWrapper[], transport: string): void;
}
//# sourceMappingURL=event-bridge-event-dispatcher-service-event-logger.d.ts.map