import { IEvent } from '../../../../utils/event/contracts';
export declare abstract class DomainEvent implements IEvent {
    private readonly createdAt;
    constructor();
    getCreatedAt(): Date;
    getEvent(): object;
    getType(): string;
}
//# sourceMappingURL=event.d.ts.map