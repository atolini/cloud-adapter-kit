import { IResponseBuilder } from '../../../../response-builder/contracts';
import { ILogger } from '../../../../../utils/logger/contracts';
import { IErrorActions } from '../../../../../utils/error-handler/contracts';
export declare class DynamoSchemaErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    private readonly handledErrors;
    canHandle(error: Error): boolean;
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=dynamo-schema-error-handler.d.ts.map