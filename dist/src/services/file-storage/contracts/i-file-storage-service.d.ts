import { Readable } from 'stream';
export interface IFileStorageService {
    uploadFile(key: string, body: Buffer | Readable | string, contentType: string): Promise<void>;
    getFile(key: string): Promise<string>;
    deleteFile(key: string): Promise<void>;
    listFiles(prefix?: string): Promise<string[]>;
}
//# sourceMappingURL=i-file-storage-service.d.ts.map