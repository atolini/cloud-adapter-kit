import { ITransactionalWriterUnit } from '../../transactional-writer/contracts';
export interface ITransactionalWriterEventLogger<S = unknown, I = unknown> {
    transactionSucceeded(units: ITransactionalWriterUnit<S, I>[]): void;
}
//# sourceMappingURL=i-transactional-writer-event-logger.d.ts.map