import { DynamoDBClient, TransactWriteItemsCommand, } from '@aws-sdk/client-dynamodb';
import { MaxItemsExceededError, } from '../../../transactional-writer/implementations/dynamo';
import { v4 as uuidv4 } from 'uuid';
export class DynamoTransactionWriter {
    client;
    maxBatchItems = 100;
    constructor(region) {
        this.client = new DynamoDBClient(region ? { region: region } : {});
    }
    async write(units) {
        this.validateBatchSize(units);
        this.validateKeys(units);
        const transacts = units.map((unit) => ({
            Put: {
                TableName: unit.container.getTableName(),
                Item: unit.item,
            },
        }));
        const params = {
            TransactItems: transacts,
            ClientRequestToken: uuidv4(),
        };
        const command = new TransactWriteItemsCommand(params);
        await this.client.send(command);
    }
    validateKeys(units) {
        for (const unit of units) {
            unit.container.validateKey(unit.item);
        }
    }
    validateBatchSize(units) {
        if (units.length > this.maxBatchItems) {
            throw new MaxItemsExceededError(this.maxBatchItems);
        }
    }
}
