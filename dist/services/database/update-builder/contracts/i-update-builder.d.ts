export interface IUpdateBuilder<T> {
    set(field: string, value: any): IUpdateBuilder<T>;
    remove(field: string): IUpdateBuilder<T>;
    add(field: string, value: number): IUpdateBuilder<T>;
    build(): T;
}
//# sourceMappingURL=i-update-builder.d.ts.map