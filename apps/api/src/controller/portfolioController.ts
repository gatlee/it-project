import { PortfolioItemModel, TextItemModel } from '../models/portfolioItem';
import { UserModel } from '../models/user';
import { UserProfile, PortfolioItemUnion } from '@pure-and-lazy/api-interfaces';

// TODO: check auth for view/add permissions
// TODO: add basic tests for each endpoint

const extractItemFromBody = (body: PortfolioItemUnion) => {
  const item = { name: body.name, description: body.description };
  switch (body.type) {
    case 'TextItem':
      return {
        model: TextItemModel,
        item: { ...item, content: body.content },
      };
  }
};

const createItem = async (req, res) => {
  const { username } = req.params;
  const { model, item } = extractItemFromBody(req.body) || {};
  if (model) {
    const now = new Date();
    const newItem = await model.create({
      ...item,
      created: now,
      lastModified: now,
    });
    try {
      await UserModel.findOneAndUpdate(
        { username },
        { $push: { portfolio: newItem } }
      );
      res.sendStatus(201);
    } catch {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
};

const viewItem = async (req, res) => {
  const { portfolioItemId } = req.params;
  try {
    const item = await PortfolioItemModel.findById(portfolioItemId);
    res.send(item);
  } catch {
    res.sendStatus(404);
  }
};

const editItem = async (req, res) => {
  const { portfolioItemId } = req.params;
  const { model, item } = extractItemFromBody(req.body) || {};
  if (model) {
    try {
      await model.findByIdAndUpdate(portfolioItemId, {
        ...item,
        lastModified: new Date(),
      });
      res.sendStatus(200);
    } catch {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
};

const viewAllItems = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username }).populate('portfolio');
    res.send(user.portfolio);
  } catch {
    res.sendStatus(404);
  }
};

const viewProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username });
    const profile: UserProfile = {
      username,
      email: user.email,
      name: user.name,
      dateJoined: user.dateJoined,
    };
    res.send(profile);
  } catch {
    res.sendStatus(404);
  }
};

const editProfile = async (req, res) => {
  // TODO
  res.send('TODO');
};

export {
  createItem,
  viewItem,
  editItem,
  viewAllItems,
  viewProfile,
  editProfile,
};
