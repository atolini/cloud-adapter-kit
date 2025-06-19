import { IDatabaseSchema } from '../../../schema/contracts';
import { KeyConfig } from '../../../schema/implementations/dynamo';
export declare class DynamoSchema<T> implements IDatabaseSchema<Record<string, unknown>, T> {
    private readonly tableName;
    private readonly partitionKey;
    private readonly sortKey?;
    constructor(tableName: string, partitionKey: KeyConfig, sortKey?: KeyConfig);
    getTableName(): string;
    validateKey(key: Record<string, unknown> | T): void;
    private validateField;
    hasSortKey(): boolean;
    getPartitionKey(): KeyConfig;
    getSortKey(): KeyConfig | null;
}
//# sourceMappingURL=dynamo-schema.d.ts.map