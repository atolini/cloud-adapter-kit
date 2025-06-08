export interface IEventDispatcherService<E> {
    publish(params: E): Promise<void>;
    publishAll(params: E[]): Promise<void>;
}
//# sourceMappingURL=i-event-dispatcher-service.d.ts.map