import { InvalidParameterException } from '@aws-sdk/client-cognito-identity-provider';
import { ResourceNotFoundException, InvalidSequenceTokenException, DataAlreadyAcceptedException, ServiceUnavailableException, UnrecognizedClientException, } from '@aws-sdk/client-cloudwatch-logs';
export class CloudWatchLogServiceErrorHandler {
    canHandle(error) {
        return (error instanceof DataAlreadyAcceptedException ||
            error instanceof InvalidParameterException ||
            error instanceof InvalidSequenceTokenException ||
            error instanceof ResourceNotFoundException ||
            error instanceof ServiceUnavailableException ||
            error instanceof UnrecognizedClientException);
    }
    handle(error, logger, resBuilder) {
        if (error instanceof ResourceNotFoundException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.notFound('Log group or log stream not found');
        }
        if (error instanceof InvalidSequenceTokenException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.badRequest('Invalid sequence token for log stream');
        }
        if (error instanceof DataAlreadyAcceptedException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.badRequest('Log event data was already accepted');
        }
        if (error instanceof InvalidParameterException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.badRequest('Invalid parameter for log request');
        }
        if (error instanceof ServiceUnavailableException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.internalError('CloudWatch Logs service is temporarily unavailable');
        }
        if (error instanceof UnrecognizedClientException) {
            logger.error({ name: error.name, message: error.message });
            return resBuilder.forbidden('AWS client is not recognized');
        }
    }
}
