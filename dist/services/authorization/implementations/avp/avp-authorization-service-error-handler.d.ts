import { ILogger } from '@logger/contracts';
import { IResponseBuilder } from '@response-builder/contracts';
import { IErrorActions } from '@error-handler/contracts';
/**
 * @template T - Response type
 * @template R - Response builder type
 *
 * Handles exceptions thrown within the {@link AVPAuthorizationService} class.
 *
 * The following exceptions may be handled by this class:
 *
 * - **ResourceNotFoundException**: Thrown if the resource does not exist.
 * - **AccessDeniedException**: Thrown if the caller does not have permission to perform the action.
 * - **ValidationException**: Thrown if the request parameters are invalid.
 * - **ThrottlingException**: Thrown if the request is throttled due to exceeding usage limits.
 * - **InternalServerException**: Thrown if an internal server error occurs.
 */
export declare class AVPAuthorizationServiceErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    /**
     *
     */
    canHandle(error: Error): boolean;
    /**
     *
     */
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=avp-authorization-service-error-handler.d.ts.map