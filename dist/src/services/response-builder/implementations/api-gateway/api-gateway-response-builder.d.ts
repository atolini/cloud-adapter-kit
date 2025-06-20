import { APIGatewayProxyResult } from 'aws-lambda';
import { IResponseBuilder } from '../../../../../services/response-builder/contracts';
export declare class APIGatewayResponseBuilder implements IResponseBuilder<APIGatewayProxyResult> {
    forbidden(message?: string, details?: unknown): APIGatewayProxyResult;
    tooManyRequests(message?: string, details?: unknown): APIGatewayProxyResult;
    ok<T>(data: T): APIGatewayProxyResult;
    created<T>(data: T): APIGatewayProxyResult;
    badRequest(message: string, details?: unknown): APIGatewayProxyResult;
    notFound(message: string): APIGatewayProxyResult;
    internalError(message?: string, details?: unknown): APIGatewayProxyResult;
    custom<T>(statusCode: number, success: boolean, payload: T): APIGatewayProxyResult;
}
//# sourceMappingURL=api-gateway-response-builder.d.ts.map