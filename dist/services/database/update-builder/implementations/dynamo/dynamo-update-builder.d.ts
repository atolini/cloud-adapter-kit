import { IUpdateBuilder } from '../../../update-builder/contracts';
import { DynamoUpdateExpressionResult } from '../../../update-builder/implementations/dynamo';
export declare class DynamoUpdateBuilder implements IUpdateBuilder<DynamoUpdateExpressionResult> {
    private readonly updateExpressions;
    private expressionAttributeNames;
    private expressionAttributeValues;
    private index;
    set(field: string, value: unknown): this;
    remove(field: string): this;
    add(field: string, value: number): this;
    build(): DynamoUpdateExpressionResult;
    private addUpdateExpression;
    private formatValue;
}
//# sourceMappingURL=dynamo-update-builder.d.ts.map