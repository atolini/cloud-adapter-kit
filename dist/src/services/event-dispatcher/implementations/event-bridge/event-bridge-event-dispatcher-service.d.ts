import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { IEventDispatcherService, IEventDispatcherServiceEventLogger } from '../../../../../services/event-dispatcher/contracts';
import { EventWrapper } from '.';
export declare class EventBridgeEventDispatcherService implements IEventDispatcherService<EventWrapper> {
    private readonly eventBusName;
    private readonly service;
    private readonly eventLogger;
    private readonly client;
    constructor(eventBusName: string, service: string, eventLogger: IEventDispatcherServiceEventLogger<EventWrapper>, client: EventBridgeClient);
    publish(event: EventWrapper): Promise<void>;
    publishAll(events: EventWrapper[]): Promise<void>;
    private sendCommand;
    private toEventBridgeEntry;
}
//# sourceMappingURL=event-bridge-event-dispatcher-service.d.ts.map