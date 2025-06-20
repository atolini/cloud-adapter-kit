import { ActionIdentifier, ContextDefinition, EntityIdentifier, VerifiedPermissionsClientConfig } from '@aws-sdk/client-verifiedpermissions';
import { AuthorizationRequest, AuthorizationResponse, BatchAuthorizationRequest, BatchAuthorizationResponse, IAuthorizationService, IAuthorizationServiceEventLogger } from '../../../../../services/authorization/contracts';
import { Token } from '.';
export declare class AVPAuthorizationService implements IAuthorizationService<ActionIdentifier, EntityIdentifier, ContextDefinition, EntityIdentifier> {
    private readonly client;
    private readonly policyStoreId;
    private readonly token;
    private readonly eventLogger;
    constructor(policyStoreId: string, eventLogger: IAuthorizationServiceEventLogger<ActionIdentifier, EntityIdentifier, ContextDefinition, EntityIdentifier>, token?: Token, clientConfig?: VerifiedPermissionsClientConfig);
    isAuthorized(request: AuthorizationRequest<ActionIdentifier, EntityIdentifier, ContextDefinition, EntityIdentifier>): Promise<AuthorizationResponse<EntityIdentifier>>;
    batchIsAuthorized(request: BatchAuthorizationRequest<ActionIdentifier, EntityIdentifier, ContextDefinition, EntityIdentifier>): Promise<BatchAuthorizationResponse<EntityIdentifier>>;
}
//# sourceMappingURL=avp-authorization-service.d.ts.map