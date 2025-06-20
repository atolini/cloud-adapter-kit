import { ILogger } from '../../../../../utils/logger/contracts';
import { IResponseBuilder } from '../../../../../services/response-builder/contracts';
import { IErrorActions } from '../../../../../utils/error-handler/contracts';
export declare class SESEmailServiceErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    canHandle(error: Error): boolean;
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=ses-email-service-error-handler.d.ts.map