import { ILogger } from '@logger/contracts';
import { IResponseBuilder } from '@response-builder/contracts';
import { IErrorActions } from '@error-handler/contracts';
/**
 * @template T - Response type
 * @template R - Response builder type
 *
 * Handles exceptions thrown within the {@link CognitoUserService} class.
 *
 * The following exceptions may be handled by this class:
 *
 * - **InternalErrorException**: If there is an internal error in the AWS Cognito service.
 * - **InvalidParameterException**: If the provided parameters are invalid.
 * - **InvalidPasswordException**: If the provided password does not meet the policy requirements.
 * - **NotAuthorizedException**: If the caller is not authorized to perform the operation.
 * - **UsernameExistsException**: If the username already exists in the User Pool.
 * - **TooManyRequestsException**: If the request is throttled due to too many requests.
 * - **InvalidEmailRoleAccessPolicyException**: If Cognito isn't allowed to use your email identity.
 * - **UserNotFoundException**: If the specified user does not exist in the User Pool.
 */
export declare class CognitoUserDirectoryServiceErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    /**
     * Checks if the error can be handled by this handler.
     *
     * @param {Error} error - The error to check.
     * @returns {boolean} True if the error is one of the handled Cognito exceptions, false otherwise.
     */
    canHandle(error: Error): boolean;
    /**
     *  Handles the provided error and builds an appropriate response using the response builder.
     *
     * @param {Error} error - The error to handle.
     * @param {ILogger<any>} logger - The logger instance for logging the error.
     * @param {R} resBuilder - The response builder instance.
     * @returns {T} The built response for the handled error.
     */
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=cognito-user-directory-service-error-handler.d.ts.map