export class AVPAuthorizationServiceEventLogger {
    logger;
    policyStoreId;
    constructor(logger, policyStoreId) {
        this.logger = logger;
        this.policyStoreId = policyStoreId;
    }
    authorizationChecked(request, response) {
        this.logger.info({
            message: 'Authorization Checked',
            policyStoreId: this.policyStoreId,
            request,
            result: response,
        });
    }
    batchAuthorizationChecked(request, response) {
        this.logger.info({
            message: 'Batch Authorization Checked',
            policyStoreId: this.policyStoreId,
            request,
            result: response,
        });
    }
}
