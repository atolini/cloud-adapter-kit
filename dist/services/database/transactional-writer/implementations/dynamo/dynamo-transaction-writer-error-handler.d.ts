import { IErrorActions } from '../../../../../utils/error-handler/contracts';
import { ILogger } from '../../../../../utils/logger/contracts';
import { IResponseBuilder } from '../../../../response-builder/contracts';
export declare class DynamoTransactionWriterErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    private readonly retryableErrors;
    canHandle(error: Error): boolean;
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=dynamo-transaction-writer-error-handler.d.ts.map