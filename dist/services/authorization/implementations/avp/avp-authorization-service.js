import { BatchIsAuthorizedCommand, BatchIsAuthorizedWithTokenCommand, IsAuthorizedCommand, IsAuthorizedWithTokenCommand, VerifiedPermissionsClient, } from '@aws-sdk/client-verifiedpermissions';
export class AVPAuthorizationService {
    client;
    policyStoreId;
    token;
    eventLogger;
    constructor(policyStoreId, eventLogger, token, clientConfig) {
        this.policyStoreId = policyStoreId;
        this.client = new VerifiedPermissionsClient(clientConfig ?? clientConfig);
        this.token = token || null;
        this.eventLogger = eventLogger;
    }
    async isAuthorized(request) {
        const { resource: resourceId, entity: entityId, context, action } = request;
        const params = {
            policyStoreId: this.policyStoreId,
            principal: entityId,
            action,
            resource: resourceId,
        };
        if (context) {
            params['context'] = context;
        }
        const command = this.token
            ? new IsAuthorizedWithTokenCommand({
                ...params,
                accessToken: this.token.accessToken,
                identityToken: this.token.identityToken,
            })
            : new IsAuthorizedCommand(params);
        const response = await this.client.send(command);
        const result = {
            resource: request.resource,
            decision: response.decision ?? 'DENY',
        };
        this.eventLogger.authorizationChecked(request, result);
        return result;
    }
    async batchIsAuthorized(request) {
        const requests = request.requests.map((r) => {
            const { resource: resourceId, entity: entityId, context, action } = r;
            return {
                principal: entityId,
                action,
                resource: resourceId,
                context,
            };
        });
        const command = this.token
            ? new BatchIsAuthorizedWithTokenCommand({
                policyStoreId: this.policyStoreId,
                accessToken: this.token.accessToken,
                identityToken: this.token.identityToken,
                requests,
            })
            : new BatchIsAuthorizedCommand({
                policyStoreId: this.policyStoreId,
                requests,
            });
        const response = await this.client.send(command);
        const results = response.results?.map((result, index) => ({
            resource: request.requests[index].resource,
            decision: result.decision ?? 'DENY',
        })) ?? [];
        const result = { results };
        this.eventLogger.batchAuthorizationChecked(request, result);
        return result;
    }
}
