export interface IUserDirectoryServiceEventLogger<T> {
    userCreated(userName: string, userAttributes: T): void;
    userUpdated(userName: string, userAttributes: T): void;
    userDeleted(userName: string): void;
}
//# sourceMappingURL=i-user-directory-service-event-logger.d.ts.map