export interface IEventDispatcherServiceEventLogger<E> {
    eventPublished(event: E, transport: string): void;
    batchEventsPublished(events: E[], transport: string): void;
}
//# sourceMappingURL=i-event-dispatcher-service-event-logger.d.ts.map