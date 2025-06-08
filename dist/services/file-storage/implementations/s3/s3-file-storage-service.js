import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command, } from '@aws-sdk/client-s3';
export class S3FileStorageService {
    bucketName;
    eventLogger;
    s3;
    constructor(bucketName, eventLogger, region) {
        this.bucketName = bucketName;
        this.eventLogger = eventLogger;
        this.s3 = new S3Client(region ? { region } : {});
    }
    async uploadFile(key, body, contentType) {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: body,
            ContentType: contentType,
        });
        await this.s3.send(command);
        this.eventLogger.fileUploaded(key, contentType);
    }
    async getFile(key) {
        const command = new GetObjectCommand({
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
        const command = new DeleteObjectCommand({
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
            const response = await this.s3.send(new ListObjectsV2Command({
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
