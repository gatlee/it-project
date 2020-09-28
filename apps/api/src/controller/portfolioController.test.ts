import makeTestSuite from './makeTestSuite';
import { UserModel } from '../models/user';
import { PortfolioItem, UserProfile } from '@pure-and-lazy/api-interfaces';
import {
  viewProfile,
  createItem,
  viewAllItems,
  viewItem,
  deleteItem,
  // TODO: add tests for `editItem` and `editProfile`
  Req,
} from './portfolioController';
import { Res } from './controllerUtil';

const jsonMangle = (object) => JSON.parse(JSON.stringify(object));

const expectJSONMatching = (actual, expected) => {
  expect(actual).toMatchObject(jsonMangle(expected));
};

const callEndpoint = async <T>(
  endpoint: (req: Req, res: Res<T>) => Promise<void>,
  req: Req
) => {
  const result: { data?; status?: number } = {};
  const res: Res<T> = {
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

makeTestSuite('Portfolio Test', () => {
  it('should return a user profile', async () => {
    await UserModel.create({
      ...userProfile,
      auth0Id,
      portfolio: [],
    });
    const { data: actualProfile, status } = await callEndpoint(viewProfile, {
      params: { username },
    });
    expect(status).toBe(200);
    expectJSONMatching(actualProfile, userProfile);
  });

  it('should add a portfolio item to the portfolio correctly', async () => {
    const { status } = await callEndpoint(createItem, {
      params: {},
      body: portfolioItem,
      user: { sub: auth0Id },
    });
    expect(status).toBe(201);
  });

  let portfolioItemId;

  it("should display the user's portfolio items", async () => {
    const { data: items, status } = await callEndpoint(viewAllItems, {
      params: { username },
    });
    expect(status).toBe(200);
    expect(items).toHaveLength(1);
    expectJSONMatching(items[0], portfolioItem);

    portfolioItemId = items[0]._id;
  });

  it('should display a single portfolio item', async () => {
    const { data: actualItem, status: status } = await callEndpoint(viewItem, {
      params: { username, portfolioItemId }
    });
    expect(status).toBe(200);
    expectJSONMatching(actualItem, portfolioItem);
  });

  it('should delete a portfolio item', async () => {
    const { data: _, status } = await callEndpoint(deleteItem, {
      params: { portfolioItemId },
      user: { sub: auth0Id },
    });
    expect(status).toBe(200);
  });

  it('should give a 404 for a deleted portfolio item', async () => {
    const { data: _, status } = await callEndpoint(viewItem, {
      params: { username, portfolioItemId },
    });
    expect(status).toBe(404);
  });

  it("should have removed the item from the user's portfolio", async () => {
    const { data: items, status } = await callEndpoint(viewAllItems, {
      params: { username },
    });
    expect(status).toBe(200);
    expect(items).toHaveLength(0);
  });
});
