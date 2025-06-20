"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3FileStorageService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
class S3FileStorageService {
    bucketName;
    eventLogger;
    s3;
    constructor(bucketName, eventLogger, region) {
        this.bucketName = bucketName;
        this.eventLogger = eventLogger;
        this.s3 = new client_s3_1.S3Client(region ? { region } : {});
    }
    async uploadFile(key, body, contentType) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: body,
            ContentType: contentType,
        });
        await this.s3.send(command);
        this.eventLogger.fileUploaded(key, contentType);
    }
    async getFile(key) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        const response = await this.s3.send(command);
        const chunks = [];
        for await (const chunk of response.Body) {
            chunks.push(chunk);
        }
        this.eventLogger.fileRetrieved(key);
        return Buffer.concat(chunks).toString('utf-8');
    }
    async deleteFile(key) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        await this.s3.send(command);
        this.eventLogger.fileDeleted(key);
    }
    async listFiles() {
        const keys = [];
        let continuationToken;
        do {
            const response = await this.s3.send(new client_s3_1.ListObjectsV2Command({
                Bucket: this.bucketName,
                ContinuationToken: continuationToken,
            }));
            keys.push(...(response.Contents?.map((item) => item.Key ?? '') ?? []));
            continuationToken = response.NextContinuationToken;
        } while (continuationToken);
        this.eventLogger.filesListed(keys);
        return keys;
    }
}
exports.S3FileStorageService = S3FileStorageService;
