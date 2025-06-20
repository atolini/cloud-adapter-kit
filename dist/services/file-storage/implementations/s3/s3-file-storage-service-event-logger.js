"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3FileStorageServiceEventLogger = void 0;
class S3FileStorageServiceEventLogger {
    logger;
    bucketName;
    constructor(logger, bucketName) {
        this.logger = logger;
        this.bucketName = bucketName;
    }
    fileUploaded(key, contentType) {
        this.logger.info({
            message: 'File Uploaded',
            bucketName: this.bucketName,
            key,
            contentType,
        });
    }
    fileRetrieved(key) {
        this.logger.info({
            message: 'File Retrieved',
            bucketName: this.bucketName,
            key,
        });
    }
    fileDeleted(key) {
        this.logger.info({
            message: 'File Deleted',
            bucketName: this.bucketName,
            key,
        });
    }
    filesListed(keys) {
        this.logger.info({
            message: 'Files Listed',
            bucketName: this.bucketName,
            total: keys.length,
            keys,
        });
    }
}
exports.S3FileStorageServiceEventLogger = S3FileStorageServiceEventLogger;
