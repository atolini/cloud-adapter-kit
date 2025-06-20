"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3FileStorageServiceErrorHandler = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
class S3FileStorageServiceErrorHandler {
    canHandle(error) {
        return (error instanceof client_s3_1.EncryptionTypeMismatch ||
            error instanceof client_s3_1.InvalidRequest ||
            error instanceof client_s3_1.NoSuchKey ||
            error instanceof client_s3_1.NoSuchBucket ||
            error instanceof client_s3_1.InvalidObjectState);
    }
    handle(error, logger, resBuilder) {
        const errorMap = [
            {
                type: client_s3_1.EncryptionTypeMismatch,
                log: {},
                response: () => resBuilder.badRequest("The specified encryption type does not match the bucket's default encryption."),
            },
            {
                type: client_s3_1.InvalidRequest,
                log: {},
                response: () => resBuilder.badRequest('The request is invalid. Please check the request parameters.'),
            },
            {
                type: client_s3_1.NoSuchKey,
                log: {},
                response: () => resBuilder.notFound('The specified key does not exist in the bucket.'),
            },
            {
                type: client_s3_1.NoSuchBucket,
                log: {},
                response: () => resBuilder.notFound('The specified bucket does not exist.'),
            },
            {
                type: client_s3_1.InvalidObjectState,
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
exports.S3FileStorageServiceErrorHandler = S3FileStorageServiceErrorHandler;
