import { ILogger } from '../../../../utils/logger/contracts';
import { IResponseBuilder } from '../../../response-builder/contracts';
import { IErrorActions } from '../../../../utils/error-handler/contracts';
export declare class AVPAuthorizationServiceErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    canHandle(error: Error): boolean;
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=avp-authorization-service-error-handler.d.ts.map