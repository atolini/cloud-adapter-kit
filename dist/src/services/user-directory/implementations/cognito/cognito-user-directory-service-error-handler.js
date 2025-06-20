"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoUserDirectoryServiceErrorHandler = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
class CognitoUserDirectoryServiceErrorHandler {
    canHandle(error) {
        return (error instanceof client_cognito_identity_provider_1.InternalErrorException ||
            error instanceof client_cognito_identity_provider_1.InvalidParameterException ||
            error instanceof client_cognito_identity_provider_1.InvalidPasswordException ||
            error instanceof client_cognito_identity_provider_1.NotAuthorizedException ||
            error instanceof client_cognito_identity_provider_1.UsernameExistsException ||
            error instanceof client_cognito_identity_provider_1.TooManyRequestsException ||
            error instanceof client_cognito_identity_provider_1.InvalidEmailRoleAccessPolicyException ||
            error instanceof client_cognito_identity_provider_1.UserNotFoundException);
    }
    handle(error, logger, resBuilder) {
        if (error instanceof client_cognito_identity_provider_1.UserNotFoundException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.notFound(error.message);
        }
        if (error instanceof client_cognito_identity_provider_1.InvalidParameterException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.badRequest('Invalid parameter in the request');
        }
        if (error instanceof client_cognito_identity_provider_1.InvalidPasswordException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.badRequest('Password does not meet requirements');
        }
        if (error instanceof client_cognito_identity_provider_1.NotAuthorizedException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.forbidden('Not authorized to perform this operation');
        }
        if (error instanceof client_cognito_identity_provider_1.UsernameExistsException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.badRequest('User already exists');
        }
        if (error instanceof client_cognito_identity_provider_1.TooManyRequestsException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.tooManyRequests('Too many requests - throttling limit reached');
        }
        if (error instanceof client_cognito_identity_provider_1.LimitExceededException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.tooManyRequests('Request limit exceeded for Cognito');
        }
        if (error instanceof client_cognito_identity_provider_1.InvalidEmailRoleAccessPolicyException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.internalError('Invalid email role access policy configuration');
        }
        if (error instanceof client_cognito_identity_provider_1.InternalErrorException) {
            logger.error({
                name: error.name,
                message: error.message,
            });
            return resBuilder.internalError('Internal error occurred in Cognito');
        }
    }
}
exports.CognitoUserDirectoryServiceErrorHandler = CognitoUserDirectoryServiceErrorHandler;
