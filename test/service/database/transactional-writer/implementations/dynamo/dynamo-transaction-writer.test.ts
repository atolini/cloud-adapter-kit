import { Logger } from '../../../../../../src/utils/logger/implementation';
import { DynamoTransactionWriter, DynamoTransactionWriterEventLogger } from '../../../../../../src/services/database/transactional-writer/implementations/dynamo';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

describe('DynamoTransactionWriter - buildTransactItems', () => {
  const client = new DynamoDBClient({});
  const logger = new Logger(); 
  const writer = new DynamoTransactionWriter(client, new DynamoTransactionWriterEventLogger(logger));

  const mockSchema = {
    getTableName: () => 'TestTable',
    getPartitionKey: () => ({ name: 'pk' }),
    getSortKey: () => ({ name: 'sk' }),
    hasSortKey: () => true,
    validateKey: jest.fn()
  };

  const originalUUID = crypto.randomUUID;

  beforeAll(() => {
    // Mock UUID to get predictable results
    let counter = 1;
    (crypto as any).randomUUID = () => `uuid-${counter++}`;
  });

  afterAll(() => {
    crypto.randomUUID = originalUUID;
  });

  it('should build insert transact item when item has no version', () => {
    const units = [
      {
        container: mockSchema,
        item: { pk: '123', sk: '456', name: 'New Item' },
      },
    ];

    const result = (writer as any).buildTransactItems(units);

    console.log(JSON.stringify(result, null, 2));

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      Put: {
        TableName: 'TestTable',
        ConditionExpression: 'attribute_not_exists(#pk) AND attribute_not_exists(#sk)',
        ExpressionAttributeNames: {
          '#pk': 'pk',
          '#sk': 'sk',
        },
      },
    });

    const unmarshalled = result[0].Put!.Item!;
    expect(unmarshalled).toHaveProperty('version');
  });

  it('should build update transact item when item has version', () => {
    const units = [
      {
        container: mockSchema,
        item: { pk: '123', sk: '456', version: 'v1', name: 'Existing Item' },
      },
    ];

    const result = (writer as any).buildTransactItems(units);
    console.log(JSON.stringify(result, null, 2));

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      Put: {
        TableName: 'TestTable',
        ConditionExpression:
          'attribute_exists(#pk) AND attribute_exists(#sk) AND version = :expectedVersion',
        ExpressionAttributeNames: {
          '#pk': 'pk',
          '#sk': 'sk',
        },
        ExpressionAttributeValues: {
          ':expectedVersion': { S: 'v1' },
        },
      },
    });

    const unmarshalled = result[0].Put!.Item!;
    expect(unmarshalled).toHaveProperty('version');
    expect(unmarshalled.version.S).not.toBe('v1'); // novo UUID
  });
});
