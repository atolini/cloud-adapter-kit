import { IFileStorageService } from '@file-storage/contracts';
/**
 *
 * Manages file operations within a specified directory.
 */
export declare class LocalStorageService implements IFileStorageService {
    private readonly dir;
    /**
     * Initializes the LocalStorage with a given directory path.
     * If the directory does not exist, it is created.
     * @param directoryPath - The relative path of the directory to manage.
     */
    constructor(directoryPath: string);
    /**
     * Asynchronously lists all files in the managed directory.
     * @returns A promise that resolves with an array containing the names of all files in the directory.
     */
    listFiles(): Promise<string[]>;
    /**
     * Reads the content of a specified file.
     * @param fileName - The name of the file to read.
     * @returns The file content as a string, or `null` if the file does not exist.
     */
    getFile(fileName: string): Promise<string | null>;
    /**
     * Writes content to a specified file. Creates the file if it does not exist.
     * @param fileName - The name of the file.
     * @param content - The content to write to the file.
     */
    uploadFile(fileName: string, content: string): Promise<void>;
    /**
     * Deletes a specified file if it exists.
     * @param fileName - The name of the file to delete.
     */
    deleteFile(fileName: string): Promise<void>;
}
//# sourceMappingURL=local-storage-service.d.ts.map