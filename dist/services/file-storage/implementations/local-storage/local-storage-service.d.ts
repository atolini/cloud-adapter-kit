import { IFileStorageService } from '../../contracts';
export declare class LocalStorageService implements IFileStorageService {
    private readonly dir;
    constructor(directoryPath: string);
    listFiles(): Promise<string[]>;
    getFile(fileName: string): Promise<string | null>;
    uploadFile(fileName: string, content: string): Promise<void>;
    deleteFile(fileName: string): Promise<void>;
}
//# sourceMappingURL=local-storage-service.d.ts.map