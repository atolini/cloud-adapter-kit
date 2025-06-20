import { ITransactionalWriterUnit } from '.';
export interface ITransactionalWriter<Container, Item> {
    write(units: ITransactionalWriterUnit<Container, Item>[]): Promise<void>;
}
//# sourceMappingURL=i-transactional-writer.d.ts.map