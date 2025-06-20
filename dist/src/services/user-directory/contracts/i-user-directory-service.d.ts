import { CreateUserInput, DeleteUserInput, UpdateUserAttributesInput } from '.';
export interface IUserDirectoryService<T> {
    createUser(input: CreateUserInput<T>): Promise<void>;
    updateUserAttributes(input: UpdateUserAttributesInput<T>): Promise<void>;
    deleteUser(input: DeleteUserInput): Promise<void>;
}
//# sourceMappingURL=i-user-directory-service.d.ts.map