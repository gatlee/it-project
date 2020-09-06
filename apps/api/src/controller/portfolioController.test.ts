import makeTestSuite from './makeTestSuite';
import { UserModel } from '../models/user';
import { TextItem, UserProfile } from '@pure-and-lazy/api-interfaces';
import {
  viewProfile,
  addItem,
  viewAllItems,
  viewItem,
} from './portfolioController';

const callEndpoint = async (endpoint, req) => {
  let data, status;
  const res = {
    send: (actualData) => {
      data = actualData;
    },
    sendStatus: (actualStatus) => {
      status = actualStatus;
    },
  };
  await endpoint(req, res);
  return { data, status };
};

const username = 'test';

const userProfile: UserProfile = {
  username,
  email: 'example@gmail.com',
  name: 'John Smith',
  dateJoined: new Date(2020, 0, 1),
};

const textItem: TextItem = {
  name: 'A Poem',
  description: 'Good stuff',
  created: new Date(2020, 0, 2),
  lastModified: new Date(2020, 0, 3),
  content: 'Roses are red, violets are blue...',
};

makeTestSuite('Portfolio Test', () => {
  it('should return a user profile', async () => {
    await UserModel.create({
      ...userProfile,
      passwordHash: 'todo: remove',
      portfolio: [],
    });
    const {
      data: { id_: _, ...actualProfile },
      status,
    } = await callEndpoint(viewProfile, { params: { username } });
    expect(status).toEqual(200);
    expect(actualProfile).toEqual(userProfile);
  });

  it('should add a text item to the portfolio correctly', async () => {
    const { status } = await callEndpoint(addItem, {
      params: { username },
      body: textItem,
    });
    expect(status).toEqual(201);
  });

  it("should display the user's portfolio items", async () => {
    const { data: items, status } = await callEndpoint(viewAllItems, {
      params: { username },
    });
    expect(status).toEqual(200);
    expect(items).toHaveLength(1);
    const [{ _id: portfolioItemId, ...actualItem }] = items;
    expect(actualItem).toEqual(textItem);

    const {
      data: actualItemAgain,
      status: statusAgain,
    } = await callEndpoint(viewItem, { params: { username, portfolioItemId } });
    expect(statusAgain).toEqual(200);
    expect(actualItemAgain).toEqual(textItem);
  });
});
