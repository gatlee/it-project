import { makeTestSuite } from './testUtil';
import { callEndpoint } from './controllerUtil';
import { createUser } from './authController';

makeTestSuite('Auth Tests', () => {
  it('should create a new user', async () => {
    const userData = {
      username: 'bob',
      auth0Id: 'some id',
      email: 'bob@bob.com',
    };
    const { status } = await callEndpoint(createUser, { body: userData });
    expect(status).toBe(201);
  });

  it('should reject user data with missing fields', async () => {
    const badData = { username: 'ok', auth0Id: null };
    const { status } = await callEndpoint(createUser, { body: badData });
    expect(status).toBe(400);
  });
});
