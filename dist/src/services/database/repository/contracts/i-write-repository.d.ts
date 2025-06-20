import { IConditionBuilder } from '../../../../../services/database/condition-builder/contracts';
import { IUpdateBuilder } from '../../../../../services/database/update-builder/contracts';
export interface IWriteRepository<T, K, C extends IConditionBuilder<any>, U extends IUpdateBuilder<any>> {
    putItem(item: T): Promise<T>;
    deleteItem(key: K): Promise<void>;
    batchWriteItems?(putItems: T[], deleteKeys?: K[]): Promise<Array<{
        type: 'put' | 'delete';
        item: T | K;
    }>>;
    update(update: U, key: K, condition?: C): Promise<T | null>;
}
//# sourceMappingURL=i-write-repository.d.ts.map