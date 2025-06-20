export interface IResponseBuilder<R> {
    ok<T>(data: T): R;
    created<T>(data: T): R;
    notFound(message: string): R;
    badRequest(message: string, details?: unknown): R;
    internalError(message?: string, details?: unknown): R;
    tooManyRequests(message?: string, details?: unknown): R;
    custom<T>(statusCode: number, success: boolean, payload: T): R;
    forbidden(message: string, details?: unknown): R;
}
//# sourceMappingURL=i-response-builder.d.ts.map