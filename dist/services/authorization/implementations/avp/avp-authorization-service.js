"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVPAuthorizationService = void 0;
const client_verifiedpermissions_1 = require("@aws-sdk/client-verifiedpermissions");
class AVPAuthorizationService {
    client;
    policyStoreId;
    token;
    eventLogger;
    constructor(policyStoreId, eventLogger, token, clientConfig) {
        this.policyStoreId = policyStoreId;
        this.client = new client_verifiedpermissions_1.VerifiedPermissionsClient(clientConfig ?? clientConfig);
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
            ? new client_verifiedpermissions_1.IsAuthorizedWithTokenCommand({
                ...params,
                accessToken: this.token.accessToken,
                identityToken: this.token.identityToken,
            })
            : new client_verifiedpermissions_1.IsAuthorizedCommand(params);
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
            ? new client_verifiedpermissions_1.BatchIsAuthorizedWithTokenCommand({
                policyStoreId: this.policyStoreId,
                accessToken: this.token.accessToken,
                identityToken: this.token.identityToken,
                requests,
            })
            : new client_verifiedpermissions_1.BatchIsAuthorizedCommand({
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
exports.AVPAuthorizationService = AVPAuthorizationService;
