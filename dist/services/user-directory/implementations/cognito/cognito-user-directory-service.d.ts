import { AttributeType } from '@aws-sdk/client-cognito-identity-provider';
import { IUserDirectoryService, CreateUserInput, UpdateUserAttributesInput, DeleteUserInput, IUserDirectoryServiceEventLogger } from '../../contracts';
export declare class CognitoUserDirectoryService implements IUserDirectoryService<AttributeType> {
    private readonly client;
    private readonly userPoolId;
    private readonly eventLogger;
    constructor(userPoolId: string, eventLogger: IUserDirectoryServiceEventLogger<AttributeType[]>, region?: string);
    createUser(input: CreateUserInput<AttributeType>): Promise<void>;
    updateUserAttributes(input: UpdateUserAttributesInput<AttributeType>): Promise<void>;
    deleteUser(input: DeleteUserInput): Promise<void>;
}
//# sourceMappingURL=cognito-user-directory-service.d.ts.map