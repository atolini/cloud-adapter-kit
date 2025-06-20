"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoUserDirectoryService = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
class CognitoUserDirectoryService {
    client;
    userPoolId;
    eventLogger;
    constructor(userPoolId, eventLogger, region) {
        this.client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient(region ? { region } : {});
        this.userPoolId = userPoolId;
        this.eventLogger = eventLogger;
    }
    async createUser(input) {
        const userName = input.login;
        const userAttributes = input.userAttributes;
        const command = new client_cognito_identity_provider_1.AdminCreateUserCommand({
            UserPoolId: this.userPoolId,
            Username: userName,
            TemporaryPassword: input.temporaryPassword,
            UserAttributes: userAttributes,
            MessageAction: input.suppressMessage ? 'SUPPRESS' : undefined,
        });
        await this.client.send(command);
        this.eventLogger.userCreated(userName, userAttributes);
    }
    async updateUserAttributes(input) {
        const userName = input.id;
        const userAttributes = input.userAttributes;
        const command = new client_cognito_identity_provider_1.AdminUpdateUserAttributesCommand({
            UserPoolId: this.userPoolId,
            Username: userName,
            UserAttributes: userAttributes,
        });
        await this.client.send(command);
        this.eventLogger.userUpdated(userName, userAttributes);
    }
    async deleteUser(input) {
        const userName = input.id;
        const command = new client_cognito_identity_provider_1.AdminDeleteUserCommand({
            UserPoolId: this.userPoolId,
            Username: userName,
        });
        await this.client.send(command);
        this.eventLogger.userDeleted(userName);
    }
}
exports.CognitoUserDirectoryService = CognitoUserDirectoryService;
