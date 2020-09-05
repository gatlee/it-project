import connectToDatabase from '../models';
import { viewItem, viewProfile } from './portfolioController';

const testEndpoint = (endpoint, req, expected) => {
  test(endpoint.name, async () => {
    let actual: string;
    const res = {
      send: (data) => {
        actual = data;
      },
    };
    endpoint(req, res);
    expect(actual).toBe(expected);
  });
};

const basicTests = [
  [
    viewProfile,
    {
      _id: { $oid: '5f534a7c74f01570b5b8821b' },
      username: 'test',
      email: 'example@gmail.com',
      passwordHash: 'todo: remove',
      name: 'John Smith',
      dateJoined: { $date: { $numberLong: '1567605600000' } },
      portfolio: [{ $oid: '5f53860f87434937981e8ce7' }],
    },
  ],
  [
    viewItem,
    {
      _id: { $oid: '5f53860f87434937981e8ce7' },
      name: 'A Poem',
      description: 'Good stuff',
      content: 'Roses are red, violets are blue...',
    },
  ],
];

const req = {
  username: 'test',
  portfolioItemId: { $oid: '5f53860f87434937981e8ce7' },
};

describe('Portfolio Test', () => {
  beforeAll(connectToDatabase);

  for (const [endpoint, expected] of basicTests) {
    testEndpoint(endpoint, req, expected);
  }
});
