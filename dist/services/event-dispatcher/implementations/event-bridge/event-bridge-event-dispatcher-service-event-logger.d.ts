import { IEventDispatcherServiceEventLogger } from '../../contracts';
import { ILogger } from '../../../../utils/logger/contracts';
import { EventWrapper } from '.';
export declare class EventBridgeEventDispatcherServiceEventLogger implements IEventDispatcherServiceEventLogger<EventWrapper> {
    private readonly logger;
    constructor(logger: ILogger<any>);
    eventPublished(event: EventWrapper, transport: string): void;
    batchEventsPublished(events: EventWrapper[], transport: string): void;
}
//# sourceMappingURL=event-bridge-event-dispatcher-service-event-logger.d.ts.map