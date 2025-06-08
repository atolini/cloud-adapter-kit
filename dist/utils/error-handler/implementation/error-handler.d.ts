import { ILogger } from '../../logger/contracts';
import { IResponseBuilder } from '../../../services/response-builder/contracts';
import { IErrorActions } from '../contracts';
export declare class ErrorHandler<T, R extends IResponseBuilder<T>> {
    private readonly handlers;
    private readonly logger;
    private readonly resBuilder;
    constructor(resBuilder: R, logger: ILogger<any>, handlers: IErrorActions<T, R>[]);
    handleError(error: Error): T;
}
//# sourceMappingURL=error-handler.d.ts.map