import { InternalException } from '@aws-sdk/client-eventbridge';
export class EventBridgeEventDispatcherErrorHandler {
    canHandle(error) {
        return error instanceof InternalException;
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: InternalException,
                log: {},
                response: () => resBuilder.internalError(),
            },
        ];
        for (const entry of errorMap) {
            if (error instanceof entry.type) {
                logger.error({
                    name: error.name,
                    message: error.message,
                });
                return entry.response();
            }
        }
    }
}
