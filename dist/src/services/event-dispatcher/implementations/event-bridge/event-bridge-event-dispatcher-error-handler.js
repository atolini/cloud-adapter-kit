"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBridgeEventDispatcherErrorHandler = void 0;
const client_eventbridge_1 = require("@aws-sdk/client-eventbridge");
class EventBridgeEventDispatcherErrorHandler {
    canHandle(error) {
        return error instanceof client_eventbridge_1.InternalException;
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: client_eventbridge_1.InternalException,
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
exports.EventBridgeEventDispatcherErrorHandler = EventBridgeEventDispatcherErrorHandler;
