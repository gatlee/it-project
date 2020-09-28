import makeTestSuite from './makeTestSuite';
import { UserModel } from '../models/user';
import { PortfolioItem, UserProfile } from '@pure-and-lazy/api-interfaces';
import {
  viewProfile,
  createItem,
  viewAllItems,
  viewItem,
  deleteItem,
  editItem,
  editProfile,
  Req,
} from './portfolioController';
import { Res } from './controllerUtil';

const jsonMangle = (object) => JSON.parse(JSON.stringify(object));

const expectJSONMatching = (actual, expected) => {
  expect(actual).toMatchObject(jsonMangle(expected));
};

const callEndpoint = async <T, U>(
  endpoint: (req: Req<T>, res: Res<U>) => Promise<void>,
  req: Req<T>
) => {
  const result: { data?; status?: number } = {};
  const res: Res<U> = {
    send: (object) => {
      result.data = jsonMangle(object);
      result.status = 200;
    },
    sendStatus: (status) => {
      result.status = status;
    },
  };
  await endpoint(req, res);
  return result;
};

const username = 'test';
const auth0Id = 'some_id';
const defaultReq = { params: {}, query: {} };
const usernameReq = { ...defaultReq, params: { username } };
const authReq = { ...defaultReq, user: { sub: auth0Id } };

const userProfile: UserProfile = {
  username,
  email: 'example@gmail.com',
  name: 'John Smith',
  dateJoined: new Date(2020, 0, 1),
};

const portfolioItem: PortfolioItem = {
  category: 'projects',
  name: 'A Poem',
  description: 'Good stuff',
  content: 'Roses are red, violets are blue...',
};

const portfolioItem2: PortfolioItem = {
  ...portfolioItem,
  name: 'Good first line',
  content:
    'The Waystone Inn lay in silence, and it was a silence of three parts.',
};

makeTestSuite('Portfolio Test', () => {
  it('should return a user profile', async () => {
    await UserModel.create({
      ...userProfile,
      auth0Id,
      portfolio: [],
    });
    const { data: actualProfile, status } = await callEndpoint(
      viewProfile,
      usernameReq
    );
    expect(status).toBe(200);
    expectJSONMatching(actualProfile, userProfile);
  });

  it('should allow editing the user profile', async () => {
    const newProfile = {
      ...userProfile,
      name: 'Jane Doe',
      email: 'anotherexample@gmail.com',
    };
    const { status } = await callEndpoint(editProfile, {
      ...authReq,
      body: newProfile,
    });
    expect(status).toBe(200);

    const { data, status: status2 } = await callEndpoint(
      viewProfile,
      usernameReq
    );
    expect(status2).toBe(200);
    expectJSONMatching(data, newProfile);
  });

  it('should add a portfolio item to the portfolio correctly', async () => {
    const { status } = await callEndpoint(createItem, {
      ...authReq,
      body: portfolioItem,
    });
    expect(status).toBe(201);
  });

  let portfolioItemId;

  it("should display the user's portfolio items", async () => {
    const { data: items, status } = await callEndpoint(
      viewAllItems,
      usernameReq
    );
    expect(status).toBe(200);
    expect(items).toHaveLength(1);
    expectJSONMatching(items[0], portfolioItem);

    portfolioItemId = items[0]._id;
  });

  it('should display multiple portfolio items (filtered by projects)', async () => {
    const { status } = await callEndpoint(createItem, {
      ...authReq,
      body: portfolioItem2,
    });
    expect(status).toBe(201);

    const { data: items, status: status2 } = await callEndpoint(viewAllItems, {
      ...usernameReq,
      query: { category: 'projects' },
    });
    expect(status2).toBe(200);
    expect(items).toHaveLength(2);
    expectJSONMatching(items[0], portfolioItem);
    expectJSONMatching(items[1], portfolioItem2);
  });

  it('should display 0 portfolio items (filtered by blog)', async () => {
    const { data: items, status } = await callEndpoint(viewAllItems, {
      ...usernameReq,
      query: { category: 'blog' },
    });
    expect(status).toBe(200);
    expect(items).toHaveLength(0);
  });

  it('should display a single portfolio item', async () => {
    const { data: actualItem, status } = await callEndpoint(viewItem, {
      ...defaultReq,
      params: { username, portfolioItemId },
    });
    expect(status).toBe(200);
    expectJSONMatching(actualItem, portfolioItem);
  });

  it('should allow editing a portfolio item', async () => {
    const newItem = {
      ...portfolioItem,
      name: 'A Poem, Revised',
      content: '... (there is no poem)',
    };
    const { status } = await callEndpoint(editItem, {
      ...authReq,
      params: { portfolioItemId },
      body: newItem,
    });
    expect(status).toBe(200);

    const { data, status: status2 } = await callEndpoint(viewItem, {
      ...defaultReq,
      params: { username, portfolioItemId },
    });
    expect(status2).toBe(200);
    expectJSONMatching(data, newItem);
  });

  it('should delete a portfolio item', async () => {
    const { data: _, status } = await callEndpoint(deleteItem, {
      ...authReq,
      params: { portfolioItemId },
    });
    expect(status).toBe(200);
  });

  it('should give a 404 for a deleted portfolio item', async () => {
    const { data: _, status } = await callEndpoint(viewItem, {
      ...defaultReq,
      params: { username, portfolioItemId },
    });
    expect(status).toBe(404);
  });

  it("should have removed the item from the user's portfolio", async () => {
    const { data: items, status } = await callEndpoint(
      viewAllItems,
      usernameReq
    );
    expect(status).toBe(200);
    expect(items).toHaveLength(1);
    expectJSONMatching(items[0], portfolioItem2);
  });
});
