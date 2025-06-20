import { IResponseBuilder } from '../../../../../../services/response-builder/contracts';
import { ILogger } from '../../../../../../utils/logger/contracts';
import { IErrorActions } from '../../../../../../utils/error-handler/contracts';
export declare class DynamoReadRepositoryErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    private readonly retryableErrors;
    canHandle(error: Error): boolean;
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=dynamo-read-repository-error-handler.d.ts.map