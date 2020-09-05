import { viewProfile } from './portfolioController';

const testEndpoint = (endpoint, expected) => {
  test(endpoint.name, async () => {
    let actual: string;
    const res = {
      send: (data) => {
        actual = data;
      },
    };
    const req = {};
    endpoint(req, res);
    expect(actual).toBe(expected);
  });
};

const tests = [
  [
    viewProfile,
    {
      _id: { $oid: '5f534a7c74f01570b5b8821b' },
      username: 'test',
      email: 'example@gmail.com',
      passwordHash: 'todo: remove',
      name: 'John Smith',
      dateJoined: { $date: { $numberLong: '1567605600000' } },
      portfolio: [],
    },
  ],
];

for (const [endpoint, expected] of tests) {
  testEndpoint(endpoint, expected);
}
