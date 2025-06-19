import { DynamoDBClient, TransactWriteItemsCommand, } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { MaxItemsExceededError, } from '../../../transactional-writer/implementations/dynamo';
import { createHash } from 'crypto';
export class DynamoTransactionWriter {
    client;
    maxBatchItems = 100;
    constructor(region) {
        this.client = new DynamoDBClient(region ? { region: region } : {});
    }
    async write(units) {
        this.validateBatchSize(units);
        this.validateKeys(units);
        const unitsWithHash = units.map((unit) => ({
            container: unit.container,
            item: {
                ...unit.item,
                hash: this.hashItem(unit.item),
            },
        }));
        const transacts = this.buildTransactItems(unitsWithHash);
        const params = {
            TransactItems: transacts,
            ClientRequestToken: this.buildClientRequestToken(unitsWithHash),
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
    hashItem(item) {
        const sorted = Object.keys(item)
            .sort()
            .reduce((acc, key) => {
            acc[key] = item[key];
            return acc;
        }, {});
        const json = JSON.stringify(sorted);
        return createHash('sha256').update(json).digest('hex');
    }
    buildTransactItems(unitsWithHash) {
        return unitsWithHash.map(({ container, item }) => {
            const pkName = container.getPartitionKey().name;
            const skName = container.getSortKey()?.name;
            const hasSortKey = !!skName;
            const condition = hasSortKey
                ? '(attribute_not_exists(#pk) AND attribute_not_exists(#sk)) OR contentHash = :expectedHash'
                : 'attribute_not_exists(#pk) OR contentHash = :expectedHash';
            const expressionNames = {
                '#pk': pkName,
                ...(hasSortKey && skName ? { '#sk': skName } : {}),
            };
            const expressionValues = {
                ':expectedHash': { S: item.hash },
            };
            return {
                Put: {
                    TableName: container.getTableName(),
                    Item: marshall(item),
                    ConditionExpression: condition,
                    ExpressionAttributeNames: expressionNames,
                    ExpressionAttributeValues: expressionValues,
                },
            };
        });
    }
    buildClientRequestToken(unitsWithHash) {
        const combinedHash = unitsWithHash
            .map(unit => unit.item.hash)
            .sort()
            .join('|');
        return createHash('sha256').update(combinedHash).digest('hex');
    }
}
