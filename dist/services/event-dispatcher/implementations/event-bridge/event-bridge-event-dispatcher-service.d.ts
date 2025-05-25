import { IEventDispatcherService, IEventDispatcherServiceEventLogger } from '@event-dispatcher/contracts';
import { EventWrapper } from '.';
/**
 *
 * Implementation of IEventDispatcherService that sends events to AWS EventBridge.
 *
 * This class provides methods to publish single or multiple events to an EventBridge event bus.
 * It converts event objects into EventBridge entries and sends them using the AWS SDK.
 *
 * To create an instance of this class, you need to provide the event bus name, service name, an event logger, and optionally the AWS region.
 *
 * Each `EventWrapper` object sent to this class contains an event instance and a `requestId` (and optionally a `userId`).
 * The `requestId` is a unique identifier for the request and is included in the event payload
 * to enable tracking across distributed systems (e.g., multiple Lambda functions or services).
 *
 * @example
 * const eventLogger = new ConsoleEventLogger();
 * const bus = new EventBridgeEventDispatcherService('my-event-bus', 'my-service', eventLogger, 'us-east-1');
 * const event = new UserCreatedEvent({ userId: '123', email: 'user@example.com' });
 * await bus.publish({ event, requestId: 'abc-123' });
 */
export declare class EventBridgeEventDispatcherService implements IEventDispatcherService<EventWrapper> {
    private readonly eventBusName;
    private readonly service;
    private readonly eventLogger;
    private readonly client;
    /**
     * Creates an instance of EventBridgeEventDispatcherService.
     *
     * @param {string} eventBusName - The name of the EventBridge event bus to which events will be published.
     * @param {string} service - The name of the service or source publishing the events.
     * @param {IEventDispatcherServiceEventLogger<EventWrapper>} eventLogger - Logger instance for event publishing actions.
     * @param {string} [region] - Optional AWS region. If not provided, uses the default SDK configuration.
     */
    constructor(eventBusName: string, service: string, eventLogger: IEventDispatcherServiceEventLogger<EventWrapper>, region?: string);
    /**
     * Publishes a single event to AWS EventBridge.
     *
     * @param {EventWrapper} event - Object containing the event instance and a unique requestId for tracing.
     * @returns {Promise<void>} A promise that resolves when the event has been successfully published.
     *
     * @throws {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/eventbridge/command/PutEventsCommand/ | InternalException} Throws if there is an error on the EventBridge service side.
     *
     * This function uses the AWS SDK command:
     * - {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/eventbridge/command/PutEventsCommand/ | PutEventsCommand} for more details.
     */
    publish(event: EventWrapper): Promise<void>;
    /**
     * Publishes multiple domain events to AWS EventBridge in a single batch request.
     *
     * @param {EventWrapper[]} events - Array of objects each containing a domain event instance and a requestId.
     * @returns {Promise<void>} A promise that resolves when all events have been successfully published.
     *
     * @throws {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/eventbridge/command/PutEventsCommand/ | InternalException} Throws if there is an error on the EventBridge service side.
     *
     * This function uses the AWS SDK command:
     * - {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/eventbridge/command/PutEventsCommand/ | PutEventsCommand} for more details.
     */
    publishAll(events: EventWrapper[]): Promise<void>;
    /**
     * Sends a PutEventsCommand to EventBridge with the given entries.
     *
     * @private
     * @param {PutEventsRequestEntry[]} entries - The list of entries to send.
     * @returns {Promise<void>} A promise that resolves once the command is sent.
     */
    private sendCommand;
    /**
     * Converts a domain event into an EventBridge entry.
     *
     * @private
     * @param {IEvent<any>} event - The domain event to convert.
     * @returns {PutEventsRequestEntry} The EventBridge entry.
     */
    private toEventBridgeEntry;
}
//# sourceMappingURL=event-bridge-event-dispatcher-service.d.ts.map