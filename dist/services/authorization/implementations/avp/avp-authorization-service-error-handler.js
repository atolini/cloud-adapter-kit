"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVPAuthorizationServiceErrorHandler = void 0;
const client_verifiedpermissions_1 = require("@aws-sdk/client-verifiedpermissions");
class AVPAuthorizationServiceErrorHandler {
    canHandle(error) {
        return (error instanceof client_verifiedpermissions_1.ResourceNotFoundException ||
            error instanceof client_verifiedpermissions_1.AccessDeniedException ||
            error instanceof client_verifiedpermissions_1.ValidationException ||
            error instanceof client_verifiedpermissions_1.ThrottlingException ||
            error instanceof client_verifiedpermissions_1.InternalServerException);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: client_verifiedpermissions_1.ResourceNotFoundException,
                log: {},
                response: () => resBuilder.notFound('The resource was not found'),
            },
            {
                type: client_verifiedpermissions_1.AccessDeniedException,
                log: {},
                response: () => resBuilder.forbidden('Access denied for the requested action'),
            },
            {
                type: client_verifiedpermissions_1.ValidationException,
                log: {},
                response: () => resBuilder.badRequest('Invalid request parameters'),
            },
            {
                type: client_verifiedpermissions_1.ThrottlingException,
                log: {},
                response: () => resBuilder.tooManyRequests('Request was throttled due to exceeding usage limits'),
            },
            {
                type: client_verifiedpermissions_1.InternalServerException,
                log: {},
                response: () => resBuilder.internalError('Internal server error occurred'),
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
exports.AVPAuthorizationServiceErrorHandler = AVPAuthorizationServiceErrorHandler;
