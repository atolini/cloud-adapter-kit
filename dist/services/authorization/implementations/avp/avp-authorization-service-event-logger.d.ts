import { ActionIdentifier, EntityIdentifier, ContextDefinition } from '@aws-sdk/client-verifiedpermissions';
import { AuthorizationRequest, AuthorizationResponse, BatchAuthorizationRequest, BatchAuthorizationResponse, IAuthorizationServiceEventLogger } from '../../contracts';
import { ILogger } from '../../../../utils/logger/contracts';
export declare class AVPAuthorizationServiceEventLogger implements IAuthorizationServiceEventLogger<ActionIdentifier, EntityIdentifier, ContextDefinition, EntityIdentifier> {
    private readonly logger;
    private readonly policyStoreId;
    constructor(logger: ILogger<unknown>, policyStoreId: string);
    authorizationChecked(request: AuthorizationRequest<ActionIdentifier, EntityIdentifier, ContextDefinition, EntityIdentifier>, response: AuthorizationResponse<EntityIdentifier>): void;
    batchAuthorizationChecked(request: BatchAuthorizationRequest<ActionIdentifier, EntityIdentifier, ContextDefinition, EntityIdentifier>, response: BatchAuthorizationResponse<EntityIdentifier>): void;
}
//# sourceMappingURL=avp-authorization-service-event-logger.d.ts.map