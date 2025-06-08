import { ILogger } from '../../../../utils/logger/contracts';
import { IResponseBuilder } from '../../../response-builder/contracts';
import { IErrorActions } from '../../../../utils/error-handler/contracts';
export declare class S3FileStorageServiceErrorHandler<T, R extends IResponseBuilder<T>> implements IErrorActions<T, R> {
    canHandle(error: Error): boolean;
    handle(error: Error, logger: ILogger<any>, resBuilder: R): T;
}
//# sourceMappingURL=s3-file-storage-service-error-handler.d.ts.map