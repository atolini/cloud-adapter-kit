import { AttributeValue } from '@aws-sdk/client-dynamodb';
export type DynamoConditionExpressionResult = {
    ConditionExpression: string;
    ExpressionAttributeNames: Record<string, string>;
    ExpressionAttributeValues: Record<string, AttributeValue>;
};
//# sourceMappingURL=dynamo-condition-expression-result.d.ts.map