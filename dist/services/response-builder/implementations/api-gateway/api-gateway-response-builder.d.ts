import { APIGatewayProxyResult } from 'aws-lambda';
import { IResponseBuilder } from '@response-builder/contracts';
/**
 *
 * Provides standardized methods to build HTTP responses compatible with AWS API Gateway.
 * Each method constructs a response object with appropriate status code, headers, and body format.
 * This class ensures consistent response structures across Lambda functions.
 */
export declare class APIGatewayResponseBuilder implements IResponseBuilder<APIGatewayProxyResult> {
    /**
     * Returns a 403 Forbidden response.
     *
     * @param {string} [message='Forbidden'] - Optional custom message.
     * @param {unknown} [details] - Optional additional error details.
     * @returns {APIGatewayProxyResult} A formatted 403 response.
     */
    forbidden(message?: string, details?: unknown): APIGatewayProxyResult;
    /**
     * Returns a 429 Too Many Requests response.
     *
     * @param {string} [message='Too Many Requests'] - Optional custom message.
     * @param {unknown} [details] - Optional additional error details.
     * @returns {APIGatewayProxyResult} A formatted 429 response.
     */
    tooManyRequests(message?: string, details?: unknown): APIGatewayProxyResult;
    /**
     * Returns a 200 OK response with the provided data.
     *
     * @template T
     * @param {T} data - The response payload.
     * @returns {APIGatewayProxyResult} A formatted 200 response.
     */
    ok<T>(data: T): APIGatewayProxyResult;
    /**
     * Returns a 201 Created response with the provided data.
     *
     * @template T
     * @param {T} data - The response payload.
     * @returns {APIGatewayProxyResult} A formatted 201 response.
     */
    created<T>(data: T): APIGatewayProxyResult;
    /**
     * Returns a 400 Bad Request response.
     *
     * @param {string} message - Description of the bad request.
     * @param {unknown} [details] - Optional additional error details.
     * @returns {APIGatewayProxyResult} A formatted 400 response.
     */
    badRequest(message: string, details?: unknown): APIGatewayProxyResult;
    /**
     * Returns a 404 Not Found response.
     *
     * @param {string} message - Message indicating what was not found.
     * @returns {APIGatewayProxyResult} A formatted 404 response.
     */
    notFound(message: string): APIGatewayProxyResult;
    /**
     * Returns a 500 Internal Server Error response.
     *
     * @param {string} [message='Internal Server Error'] - Optional custom message.
     * @param {unknown} [details] - Optional additional error details.
     * @returns {APIGatewayProxyResult} A formatted 500 response.
     */
    internalError(message?: string, details?: unknown): APIGatewayProxyResult;
    /**
     * Returns a custom response with the given status code, success flag, and payload.
     *
     * @template T
     * @param {number} statusCode - The HTTP status code to return.
     * @param {boolean} success - Whether the response represents a successful outcome.
     * @param {T} payload - The response payload.
     * @returns {APIGatewayProxyResult} A formatted custom response.
     */
    custom<T>(statusCode: number, success: boolean, payload: T): APIGatewayProxyResult;
}
//# sourceMappingURL=api-gateway-response-builder.d.ts.map