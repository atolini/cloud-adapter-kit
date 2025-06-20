import { Readable } from 'stream';
import { IFileStorageService, IFileStorageServiceEventLogger } from '../../../../../services/file-storage/contracts';
export declare class S3FileStorageService implements IFileStorageService {
    private readonly bucketName;
    private readonly eventLogger;
    private readonly s3;
    constructor(bucketName: string, eventLogger: IFileStorageServiceEventLogger, region?: string);
    uploadFile(key: string, body: Buffer | Readable | string, contentType: string): Promise<void>;
    getFile(key: string): Promise<string>;
    deleteFile(key: string): Promise<void>;
    listFiles(): Promise<string[]>;
}
//# sourceMappingURL=s3-file-storage-service.d.ts.map