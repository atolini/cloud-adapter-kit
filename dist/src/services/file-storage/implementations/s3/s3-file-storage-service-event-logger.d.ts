import { ILogger } from '../../../../../utils/logger/contracts';
export declare class S3FileStorageServiceEventLogger {
    private readonly logger;
    private readonly bucketName;
    constructor(logger: ILogger<unknown>, bucketName: string);
    fileUploaded(key: string, contentType: string): void;
    fileRetrieved(key: string): void;
    fileDeleted(key: string): void;
    filesListed(keys: string[]): void;
}
//# sourceMappingURL=s3-file-storage-service-event-logger.d.ts.map