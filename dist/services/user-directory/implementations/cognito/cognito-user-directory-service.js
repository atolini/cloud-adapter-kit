import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminUpdateUserAttributesCommand, AdminDeleteUserCommand, } from '@aws-sdk/client-cognito-identity-provider';
export class CognitoUserDirectoryService {
    client;
    userPoolId;
    eventLogger;
    constructor(userPoolId, eventLogger, region) {
        this.client = new CognitoIdentityProviderClient(region ? { region } : {});
        this.userPoolId = userPoolId;
        this.eventLogger = eventLogger;
    }
    async createUser(input) {
        const userName = input.login;
        const userAttributes = input.userAttributes;
        const command = new AdminCreateUserCommand({
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
        const command = new AdminUpdateUserAttributesCommand({
            UserPoolId: this.userPoolId,
            Username: userName,
            UserAttributes: userAttributes,
        });
        await this.client.send(command);
        this.eventLogger.userUpdated(userName, userAttributes);
    }
    async deleteUser(input) {
        const userName = input.id;
        const command = new AdminDeleteUserCommand({
            UserPoolId: this.userPoolId,
            Username: userName,
        });
        await this.client.send(command);
        this.eventLogger.userDeleted(userName);
    }
}
