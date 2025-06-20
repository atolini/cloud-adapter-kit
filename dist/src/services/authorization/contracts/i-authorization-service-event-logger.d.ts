import { AuthorizationRequest, AuthorizationResponse, BatchAuthorizationRequest, BatchAuthorizationResponse } from '.';
export interface IAuthorizationServiceEventLogger<A, E, C, R> {
    authorizationChecked(request: AuthorizationRequest<A, E, C, R>, response: AuthorizationResponse<E>): void;
    batchAuthorizationChecked(request: BatchAuthorizationRequest<A, E, C, R>, response: BatchAuthorizationResponse<E>): void;
}
//# sourceMappingURL=i-authorization-service-event-logger.d.ts.map