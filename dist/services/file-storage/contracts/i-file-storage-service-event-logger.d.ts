export interface IFileStorageServiceEventLogger {
    fileUploaded(path: string, mimeType: string): void;
    fileRetrieved(path: string): void;
    fileDeleted(path: string): void;
    filesListed(paths: string[]): void;
}
//# sourceMappingURL=i-file-storage-service-event-logger.d.ts.map