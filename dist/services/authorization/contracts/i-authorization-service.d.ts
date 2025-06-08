import { AuthorizationRequest, AuthorizationResponse, BatchAuthorizationRequest, BatchAuthorizationResponse } from '.';
export interface IAuthorizationService<A, I, C, R> {
    isAuthorized(request: AuthorizationRequest<A, I, C, R>): Promise<AuthorizationResponse<R>>;
    batchIsAuthorized(request: BatchAuthorizationRequest<A, I, C, R>): Promise<BatchAuthorizationResponse<R>>;
}
//# sourceMappingURL=i-authorization-service.d.ts.map