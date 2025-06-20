"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoConditionBuilder = void 0;
class DynamoConditionBuilder {
    expressions = [];
    attributeNames = {};
    attributeValues = {};
    index = 0;
    eq(field, value) {
        return this.addCondition(field, '=', value);
    }
    ne(field, value) {
        return this.addCondition(field, '<>', value);
    }
    gt(field, value) {
        return this.addCondition(field, '>', value);
    }
    lt(field, value) {
        return this.addCondition(field, '<', value);
    }
    and() {
        this.expressions.push('AND');
        return this;
    }
    or() {
        this.expressions.push('OR');
        return this;
    }
    build() {
        return {
            ConditionExpression: this.expressions.join(' '),
            ExpressionAttributeNames: this.attributeNames,
            ExpressionAttributeValues: this.attributeValues,
        };
    }
    addCondition(field, operator, value) {
        const fieldPlaceholder = `#attr${this.index}`;
        const valuePlaceholder = `:val${this.index}`;
        this.expressions.push(`${fieldPlaceholder} ${operator} ${valuePlaceholder}`);
        this.attributeNames[fieldPlaceholder] = field;
        this.attributeValues[valuePlaceholder] = this.formatValue(value);
        this.index++;
        return this;
    }
    formatValue(value) {
        if (typeof value === 'string')
            return { S: value };
        if (typeof value === 'number')
            return { N: value.toString() };
        if (typeof value === 'boolean')
            return { BOOL: value };
        throw new Error(`Unsupported value type: ${typeof value}`);
    }
}
exports.DynamoConditionBuilder = DynamoConditionBuilder;
