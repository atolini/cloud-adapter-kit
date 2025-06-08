import { ResourceNotFoundException, AccessDeniedException, ValidationException, ThrottlingException, InternalServerException, } from '@aws-sdk/client-verifiedpermissions';
export class AVPAuthorizationServiceErrorHandler {
    canHandle(error) {
        return (error instanceof ResourceNotFoundException ||
            error instanceof AccessDeniedException ||
            error instanceof ValidationException ||
            error instanceof ThrottlingException ||
            error instanceof InternalServerException);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: ResourceNotFoundException,
                log: {},
                response: () => resBuilder.notFound('The resource was not found'),
            },
            {
                type: AccessDeniedException,
                log: {},
                response: () => resBuilder.forbidden('Access denied for the requested action'),
            },
            {
                type: ValidationException,
                log: {},
                response: () => resBuilder.badRequest('Invalid request parameters'),
            },
            {
                type: ThrottlingException,
                log: {},
                response: () => resBuilder.tooManyRequests('Request was throttled due to exceeding usage limits'),
            },
            {
                type: InternalServerException,
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
