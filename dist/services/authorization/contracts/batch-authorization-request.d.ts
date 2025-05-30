import { AuthorizationRequest } from '.';
/**
 * @template A The type that identifies the action.
 * @template I The type that identifies the identity.
 * @template C The type that identifies the context.
 * @template R The type that identifies the resource.
 *
 * Represents a batch of authorization requests to be evaluated together.
 * Useful for checking access to multiple resources or actions in a single operation.
 *
 * @property {AuthorizationRequest<A, I, C, R>[]} requests - An array of individual authorization requests.
 */
export interface BatchAuthorizationRequest<A, I, C, R> {
    /** An array of individual authorization requests. */
    requests: AuthorizationRequest<A, I, C, R>[];
}
//# sourceMappingURL=batch-authorization-request.d.ts.map