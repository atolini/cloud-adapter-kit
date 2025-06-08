import { ILogger } from '../../logger/contracts';
import { IResponseBuilder } from '../../../services/response-builder/contracts';
export interface IErrorActions<T, R extends IResponseBuilder<T>> {
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
    canHandle(error: Error): boolean;
}
export interface IErrorHandler<T, R extends IResponseBuilder<T>> {
    handleError(error: Error): T;
}
//# sourceMappingURL=i-error-actions.d.ts.map