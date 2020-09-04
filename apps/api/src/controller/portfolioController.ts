import { PortfolioItemModel, TextItemModel } from '../models/portfolioItem';
import { UserModel } from '../models/user';

// TODO: check auth for view/add permissions

const extractItemFromBody = (body) => {
  const item = ({ name, description } = req.body);
  switch (body.type) {
    case 'text':
      return {
        model: TextItemModel,
        item: { ...item, content: req.body.content },
      };
    default:
      return null;
  }
};

const addItem = (req, res) => {
  const { username } = req.params;
  const { model, item } = extractItemFromBody(req.body) || {};
  if (model) {
    const newItem = await model.create(item);
    await UserModel.findOneAndUpdate(
      { username },
      { $push: { portfolio: newItem } }
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

const viewItem = (req, res) => {
  const { username, portfolioItemId } = req.params;
  const item = await PortfolioItemModel.findById(portfolioItemId).exec();
  res.send(item);
};

const editItem = (req, res) => {
  const { username, portfolioItemId } = req.params;
  const { model, item } = extractItemFromBody(req.body) || {};
  if (model) {
    await model.findByIdAndUpdate(portfolioItemId, item);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

const viewAllItems = (req, res) => {
  const { username } = req.params;
  const { portfolio } = await UserModel.findOne({ username });
  res.send(portfolio);
};

const viewProfile = (req, res) => {
  const { username } = req.params;
  const profile = ({ email, name, dateJoined } = await UserModel.findOne({
    username,
  }));
  res.send(profile);
};

const editProfile = (req, res) => {
  // TODO
};

export { addItem, viewItem, editItem, viewAllItems, viewProfile, editProfile };
