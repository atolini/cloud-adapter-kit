export interface IConditionBuilder<T> {
    eq(field: string, value: string | number | boolean): IConditionBuilder<T>;
    ne(field: string, value: string | number | boolean): IConditionBuilder<T>;
    gt(field: string, value: string | number): IConditionBuilder<T>;
    lt(field: string, value: string | number): IConditionBuilder<T>;
    and(): IConditionBuilder<T>;
    or(): IConditionBuilder<T>;
    build(): T;
}
//# sourceMappingURL=i-condition-builder.d.ts.map