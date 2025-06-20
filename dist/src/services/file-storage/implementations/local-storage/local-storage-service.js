"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
const fs = require("fs");
const path = require("path");
class LocalStorageService {
    dir;
    constructor(directoryPath) {
        this.dir = path.resolve(directoryPath);
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir, { recursive: true });
        }
    }
    async listFiles() {
        return await fs.promises.readdir(this.dir);
    }
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
    async uploadFile(fileName, content) {
        const filePath = path.join(this.dir, fileName);
        await fs.promises.writeFile(filePath, content, 'utf-8');
    }
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
exports.LocalStorageService = LocalStorageService;
