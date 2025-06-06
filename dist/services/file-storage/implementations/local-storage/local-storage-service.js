import * as fs from 'fs';
import * as path from 'path';
/**
 *
 * Manages file operations within a specified directory.
 */
export class LocalStorageService {
    dir;
    /**
     * Initializes the LocalStorage with a given directory path.
     * If the directory does not exist, it is created.
     * @param directoryPath - The relative path of the directory to manage.
     */
    constructor(directoryPath) {
        this.dir = path.resolve(directoryPath);
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir, { recursive: true });
        }
    }
    /**
     * Asynchronously lists all files in the managed directory.
     * @returns A promise that resolves with an array containing the names of all files in the directory.
     */
    async listFiles() {
        return await fs.promises.readdir(this.dir);
    }
    /**
     * Reads the content of a specified file.
     * @param fileName - The name of the file to read.
     * @returns The file content as a string, or `null` if the file does not exist.
     */
    async getFile(fileName) {
        const filePath = path.join(this.dir, fileName);
        try {
            await fs.promises.access(filePath);
            return await fs.promises.readFile(filePath, 'utf-8');
        }
        catch (error) {
            if (error.code === 'ENOENT')
                return null;
            throw error;
        }
    }
    /**
     * Writes content to a specified file. Creates the file if it does not exist.
     * @param fileName - The name of the file.
     * @param content - The content to write to the file.
     */
    async uploadFile(fileName, content) {
        const filePath = path.join(this.dir, fileName);
        await fs.promises.writeFile(filePath, content, 'utf-8');
    }
    /**
     * Deletes a specified file if it exists.
     * @param fileName - The name of the file to delete.
     */
    async deleteFile(fileName) {
        const filePath = path.join(this.dir, fileName);
        try {
            await fs.promises.access(filePath);
            await fs.promises.unlink(filePath);
        }
        catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
    }
}
