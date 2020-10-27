import { UserModel } from '../models/user';
import {
  PortfolioCategory,
  PortfolioItem,
  UserProfile,
} from '@pure-and-lazy/api-interfaces';
import { expectJSONMatching, makeTestSuite } from './testUtil';
import { callEndpoint } from './controllerUtil';
import {
  createItem,
  deleteItem,
  editItem,
  editProfile,
  viewAllPublicItems,
  viewAllItemsByJwt,
  viewItem,
  viewProfile,
  viewProfileByJwt,
} from './portfolioController';

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
  description: 'nice profile description',
};

const portfolioItem: PortfolioItem = {
  category: PortfolioCategory.PROJECTS,
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

const privateItem: PortfolioItem = {
  public: false,
  category: PortfolioCategory.BLOG,
  name: 'Private blog post',
  description: 'Only people with the link can view this!',
  content: 'Nothing special',
};

makeTestSuite('Portfolio Tests', () => {
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

  it('should return the same user profile when accessing via auth', async () => {
    const { data: actualProfile, status } = await callEndpoint(
      viewProfileByJwt,
      authReq
    );
    expect(status).toBe(200);
    expectJSONMatching(actualProfile, userProfile);
  });

  it('should allow editing the user profile', async () => {
    const newProfile = {
      name: 'A better name',
      description: 'A better description',
    };
    const { status } = await callEndpoint(editProfile, {
      ...authReq,
      body: newProfile as UserProfile,
    });
    expect(status).toBe(200);

    const { data, status: status2 } = await callEndpoint(
      viewProfile,
      usernameReq
    );
    expect(status2).toBe(200);
    expectJSONMatching(data, { ...userProfile, ...newProfile });
  });

  it('should reject invalid user profiles for editing', async () => {
    const badProfile = { bad: 'no valid fields listed' };
    const { status } = await callEndpoint(editProfile, {
      ...authReq,
      body: (badProfile as unknown) as UserProfile,
    });
    expect(status).toBe(400);
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
      viewAllPublicItems,
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

    const { data: items, status: status2 } = await callEndpoint(
      viewAllPublicItems,
      {
        ...usernameReq,
        query: { category: PortfolioCategory.PROJECTS },
      }
    );
    expect(status2).toBe(200);
    expect(items).toHaveLength(2);
    expectJSONMatching(items[0], portfolioItem);
    expectJSONMatching(items[1], portfolioItem2);
  });

  it('should display 0 portfolio items (filtered by blog)', async () => {
    const { data: items, status } = await callEndpoint(viewAllPublicItems, {
      ...usernameReq,
      query: { category: PortfolioCategory.BLOG },
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
    const { status } = await callEndpoint(deleteItem, {
      ...authReq,
      params: { portfolioItemId },
    });
    expect(status).toBe(200);
  });

  it('should give a 404 for a deleted portfolio item', async () => {
    const { status } = await callEndpoint(viewItem, {
      ...defaultReq,
      params: { username, portfolioItemId },
    });
    expect(status).toBe(404);
  });

  it("should have removed the item from the user's portfolio", async () => {
    const { data: items, status } = await callEndpoint(
      viewAllPublicItems,
      usernameReq
    );
    expect(status).toBe(200);
    expect(items).toHaveLength(1);
    expectJSONMatching(items[0], portfolioItem2);
  });

  it('should reject portfolio items with missing fields', async () => {
    const badPortfolioItem = { name: 'bad', description: 'hmmm' };
    const { status } = await callEndpoint(createItem, {
      ...authReq,
      body: badPortfolioItem as PortfolioItem,
    });
    expect(status).toBe(400);
  });

  it('should reject portfolio items with an incorrect category', async () => {
    const badCategory = { ...portfolioItem, category: 'bad category' };
    const { status } = await callEndpoint(createItem, {
      ...authReq,
      body: badCategory as PortfolioItem,
    });
    expect(status).toBe(400);
  });

  it('should reject editing with invalid authentication', async () => {
    const { status } = await callEndpoint(editItem, {
      ...defaultReq,
      params: { portfolioItemId },
      body: portfolioItem,
      user: { sub: 'wrong id' },
    });
    expect(status).toBe(404);
  });

  it('should reject viewing a profile with neither a username nor proper authentication', async () => {
    const { status } = await callEndpoint(viewProfileByJwt, defaultReq);
    expect(status).toBe(400);
  });

  it('should return a 404 for unknown user profiles', async () => {
    const { status } = await callEndpoint(viewProfileByJwt, {
      ...defaultReq,
      user: { sub: 'wrong id' },
    });
    expect(status).toBe(404);
  });

  it('should not display private items from `viewAllPublicItems`', async () => {
    const { status } = await callEndpoint(createItem, {
      ...authReq,
      body: privateItem,
    });
    expect(status).toBe(201);

    const { data: items, status: status2 } = await callEndpoint(
      viewAllPublicItems,
      usernameReq
    );
    expect(status2).toBe(200);
    expect(items).toHaveLength(1);
    expectJSONMatching(items[0], portfolioItem2);
  });

  it('should display both public and private items from `viewAllItemsByJwt`', async () => {
    const { data: items, status } = await callEndpoint(
      viewAllItemsByJwt,
      authReq
    );
    expect(status).toBe(200);
    expect(items).toHaveLength(2);
    expectJSONMatching(items[0], portfolioItem2);
    expectJSONMatching(items[1], privateItem);
  });

  it('should allow filtering by blog in `viewAllItemsByJwt`', async () => {
    const { data: items, status } = await callEndpoint(viewAllItemsByJwt, {
      ...authReq,
      query: { category: PortfolioCategory.BLOG },
    });
    expect(status).toBe(200);
    expect(items).toHaveLength(1);
    expectJSONMatching(items[0], privateItem);
  });
});
