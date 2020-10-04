import { makeTestSuite } from './testUtil';
import { callEndpoint } from './controllerUtil';
import { createUser } from './authController';

const testCreateUser = async (body, status) => {
  const { status: actualStatus } = await callEndpoint(createUser, { body });
  expect(actualStatus).toBe(status);
};

const userData = {
  username: 'bob',
  auth0Id: 'some id',
  email: 'bob@bob.com',
};

makeTestSuite('Auth Tests', () => {
  it('should create a new user', async () => {
    await testCreateUser(userData, 201);
  });

  it('should reject user data with missing fields', async () => {
    await testCreateUser({ username: 'ok', auth0Id: null }, 400);
  });

  it('should reject duplicate user names', async () => {
    await testCreateUser(
      {
        username: userData.username,
        auth0Id: 'yeah alright',
        email: 'bad@gmail.com',
      },
      400
    );
  });

  it('should reject duplicate Auth0 IDs', async () => {
    await testCreateUser(
      {
        username: 'not_bob',
        auth0Id: userData.auth0Id,
        email: 'bad2@gmail.com',
      },
      400
    );
  });

  it('should accept another user (without checking email uniqueness)', async () => {
    await testCreateUser(
      { username: 'jim', auth0Id: 'hmmm', email: userData.email },
      201
    );
  });
});
