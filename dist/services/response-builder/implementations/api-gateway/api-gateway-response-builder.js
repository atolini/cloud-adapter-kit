export class APIGatewayResponseBuilder {
    forbidden(message = 'Forbidden', details) {
        return {
            statusCode: 403,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: false, message, details }),
        };
    }
    tooManyRequests(message = 'Too Many Requests', details) {
        return {
            statusCode: 429,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: false, message, details }),
        };
    }
    ok(data) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, data }),
        };
    }
    created(data) {
        return {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, data }),
        };
    }
    badRequest(message, details) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: false, message, details }),
        };
    }
    notFound(message) {
        return {
            statusCode: 404,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: false, message }),
        };
    }
    internalError(message = 'Internal Server Error', details) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: false, message, details }),
        };
    }
    custom(statusCode, success, payload) {
        return {
            statusCode,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success, ...payload }),
        };
    }
}
