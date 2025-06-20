import { AttributeType } from '@aws-sdk/client-cognito-identity-provider';
import { ILogger } from '../../../../../utils/logger/contracts';
import { IUserDirectoryServiceEventLogger } from '../../../../../services/user-directory/contracts';
export declare class CognitoUserDirectoryServiceEventLogger implements IUserDirectoryServiceEventLogger<AttributeType[]> {
    private readonly logger;
    private readonly userPoolId;
    constructor(logger: ILogger<unknown>, userPoolId: string);
    userCreated(userName: string, userAttributes: AttributeType[]): void;
    userUpdated(userName: string, userAttributes: AttributeType[]): void;
    userDeleted(userName: string): void;
}
//# sourceMappingURL=cognito-user-directory-service-event-logger.d.ts.map