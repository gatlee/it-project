import { PortfolioItemModel, TextItemModel } from '../models/portfolioItem';
import { UserModel } from '../models/user';
import { UserProfile } from '@pure-and-lazy/api-interfaces';

// TODO: check auth for view/add permissions
// TODO: add basic tests for each endpoint

const extractItemFromBody = (body) => {
  const item = { name: body.name, description: body.description };
  switch (body.type) {
    case 'text':
      return {
        model: TextItemModel,
        item: { ...item, content: body.content },
      };
    default:
      return null;
  }
};

const addItem = async (req, res) => {
  const { username } = req.params;
  const { model, item } = extractItemFromBody(req.body) || {};
  if (model) {
    const now = new Date();
    const newItem = await model.create({
      ...item,
      created: now,
      lastModified: now,
    });
    await UserModel.findOneAndUpdate(
      { username },
      { $push: { portfolio: newItem } }
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

const viewItem = async (req, res) => {
  const { portfolioItemId } = req.params;
  const item = await PortfolioItemModel.findById(portfolioItemId);
  if (item) {
    res.send(item);
  } else {
    res.sendStatus(400);
  }
};

const editItem = async (req, res) => {
  const { portfolioItemId } = req.params;
  const { model, item } = extractItemFromBody(req.body) || {};
  if (model) {
    await model.findByIdAndUpdate(portfolioItemId, {
      ...item,
      lastModified: new Date(),
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

const viewAllItems = async (req, res) => {
  const { username } = req.params;
  const user = await UserModel.findOne({ username }).populate('portfolio');
  if (user) {
    res.send(user.portfolio);
  } else {
    res.sendStatus(400);
  }
};

const viewProfile = async (req, res) => {
  const { username } = req.params;
  const user = await UserModel.findOne({ username });
  if (user) {
    const profile: UserProfile = {
      username,
      email: user.email,
      name: user.name,
      dateJoined: user.dateJoined,
    };
    res.send(profile);
  } else {
    res.sendStatus(400);
  }
};

const editProfile = async (req, res) => {
  // TODO
  res.send('TODO');
};

export { addItem, viewItem, editItem, viewAllItems, viewProfile, editProfile };
