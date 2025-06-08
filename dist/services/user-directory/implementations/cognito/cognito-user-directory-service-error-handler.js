import { InvalidParameterException, UserNotFoundException, UsernameExistsException, LimitExceededException, InternalErrorException, InvalidPasswordException, NotAuthorizedException, TooManyRequestsException, InvalidEmailRoleAccessPolicyException, } from '@aws-sdk/client-cognito-identity-provider';
export class CognitoUserDirectoryServiceErrorHandler {
    canHandle(error) {
        return (error instanceof InternalErrorException ||
            error instanceof InvalidParameterException ||
            error instanceof InvalidPasswordException ||
            error instanceof NotAuthorizedException ||
            error instanceof UsernameExistsException ||
            error instanceof TooManyRequestsException ||
            error instanceof InvalidEmailRoleAccessPolicyException ||
            error instanceof UserNotFoundException);
    }
    handle(error, logger, resBuilder) {
        if (error instanceof UserNotFoundException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.notFound(error.message);
        }
        if (error instanceof InvalidParameterException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.badRequest('Invalid parameter in the request');
        }
        if (error instanceof InvalidPasswordException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.badRequest('Password does not meet requirements');
        }
        if (error instanceof NotAuthorizedException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.forbidden('Not authorized to perform this operation');
        }
        if (error instanceof UsernameExistsException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.badRequest('User already exists');
        }
        if (error instanceof TooManyRequestsException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.tooManyRequests('Too many requests - throttling limit reached');
        }
        if (error instanceof LimitExceededException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.tooManyRequests('Request limit exceeded for Cognito');
        }
        if (error instanceof InvalidEmailRoleAccessPolicyException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.internalError('Invalid email role access policy configuration');
        }
        if (error instanceof InternalErrorException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.internalError('Internal error occurred in Cognito');
        }
    }
}
