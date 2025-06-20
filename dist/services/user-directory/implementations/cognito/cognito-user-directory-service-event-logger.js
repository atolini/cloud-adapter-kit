"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoUserDirectoryServiceEventLogger = void 0;
class CognitoUserDirectoryServiceEventLogger {
    logger;
    userPoolId;
    constructor(logger, userPoolId) {
        this.logger = logger;
        this.userPoolId = userPoolId;
    }
    userCreated(userName, userAttributes) {
        this.logger.info({
            message: 'User Created',
            userPoolId: this.userPoolId,
            userName,
            userAttributes,
        });
    }
    userUpdated(userName, userAttributes) {
        this.logger.info({
            message: 'User Updated',
            userPoolId: this.userPoolId,
            userName,
            userAttributes,
        });
    }
    userDeleted(userName) {
        this.logger.info({
            message: 'User Deleted',
            userPoolId: this.userPoolId,
            userName,
        });
    }
}
exports.CognitoUserDirectoryServiceEventLogger = CognitoUserDirectoryServiceEventLogger;
