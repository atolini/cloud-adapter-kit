import { IConditionBuilder } from '../../../../../../services/database/condition-builder/contracts';
import { DynamoConditionExpressionResult } from '../../../../../../services/database/condition-builder/implementations/dynamo';
export declare class DynamoConditionBuilder implements IConditionBuilder<DynamoConditionExpressionResult> {
    private readonly expressions;
    private attributeNames;
    private attributeValues;
    private index;
    eq(field: string, value: string | number | boolean): this;
    ne(field: string, value: string | number | boolean): this;
    gt(field: string, value: string | number): this;
    lt(field: string, value: string | number): this;
    and(): this;
    or(): this;
    build(): DynamoConditionExpressionResult;
    private addCondition;
    private formatValue;
}
//# sourceMappingURL=dynamo-condition-builder.d.ts.map