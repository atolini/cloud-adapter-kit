import { EncryptionTypeMismatch, InvalidObjectState, InvalidRequest, NoSuchBucket, NoSuchKey, } from '@aws-sdk/client-s3';
export class S3FileStorageServiceErrorHandler {
    canHandle(error) {
        return (error instanceof EncryptionTypeMismatch ||
            error instanceof InvalidRequest ||
            error instanceof NoSuchKey ||
            error instanceof NoSuchBucket ||
            error instanceof InvalidObjectState);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: EncryptionTypeMismatch,
                log: {},
                response: () => resBuilder.badRequest("The specified encryption type does not match the bucket's default encryption."),
            },
            {
                type: InvalidRequest,
                log: {},
                response: () => resBuilder.badRequest('The request is invalid. Please check the request parameters.'),
            },
            {
                type: NoSuchKey,
                log: {},
                response: () => resBuilder.notFound('The specified key does not exist in the bucket.'),
            },
            {
                type: NoSuchBucket,
                log: {},
                response: () => resBuilder.notFound('The specified bucket does not exist.'),
            },
            {
                type: InvalidObjectState,
                log: {},
                response: () => resBuilder.badRequest("The operation is not valid for the object's storage class."),
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
