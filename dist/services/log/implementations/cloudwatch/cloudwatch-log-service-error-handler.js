"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudWatchLogServiceErrorHandler = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
class CloudWatchLogServiceErrorHandler {
    canHandle(error) {
        return (error instanceof client_cloudwatch_logs_1.DataAlreadyAcceptedException ||
            error instanceof client_cognito_identity_provider_1.InvalidParameterException ||
            error instanceof client_cloudwatch_logs_1.InvalidSequenceTokenException ||
            error instanceof client_cloudwatch_logs_1.ResourceNotFoundException ||
            error instanceof client_cloudwatch_logs_1.ServiceUnavailableException ||
            error instanceof client_cloudwatch_logs_1.UnrecognizedClientException);
    }
    handle(error, logger, resBuilder) {
        if (error instanceof client_cloudwatch_logs_1.ResourceNotFoundException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.notFound('Log group or log stream not found');
        }
        if (error instanceof client_cloudwatch_logs_1.InvalidSequenceTokenException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.badRequest('Invalid sequence token for log stream');
        }
        if (error instanceof client_cloudwatch_logs_1.DataAlreadyAcceptedException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.badRequest('Log event data was already accepted');
        }
        if (error instanceof client_cognito_identity_provider_1.InvalidParameterException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.badRequest('Invalid parameter for log request');
        }
        if (error instanceof client_cloudwatch_logs_1.ServiceUnavailableException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.internalError('CloudWatch Logs service is temporarily unavailable');
        }
        if (error instanceof client_cloudwatch_logs_1.UnrecognizedClientException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.forbidden('AWS client is not recognized');
        }
    }
}
exports.CloudWatchLogServiceErrorHandler = CloudWatchLogServiceErrorHandler;
