import { InvalidKeyError } from '../../../schema/implementations/dynamo';
export class DynamoSchemaErrorHandler {
    handledErrors = new Set([InvalidKeyError]);
    canHandle(error) {
        return Array.from(this.handledErrors).some((errorType) => error instanceof errorType);
    }
    handle(error, logger, resBuilder) {
        if (error instanceof InvalidKeyError) {
            logger.error({
                name: error.name,
                message: error.message,
                table: error.tableName,
                expectedKey: error.expectedKey,
                receivedKey: error.receivedKey,
            });
            return resBuilder.badRequest(`Invalid key: ${error.message}`);
        }
    }
}
