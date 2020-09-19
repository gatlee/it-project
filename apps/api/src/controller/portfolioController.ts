import { isDocument } from '@typegoose/typegoose';
import { PortfolioItemModel, TextItemModel } from '../models/portfolioItem';
import { UserModel } from '../models/user';
import { UserProfile, PortfolioItemUnion } from '@pure-and-lazy/api-interfaces';
import { Res } from './controllerUtil';

/** extractItemFromBody takes a request body containing portfolio item information
    and extracts the appropriate fields based on the portfolio item type.
    It returns the relevant DB model and the extracted fields. */
const extractItemFromBody = (body?: PortfolioItemUnion): { model; item } => {
  if (!body) {
    return { model: null, item: null };
  }
  const item = { name: body.name, description: body.description };
  if ('type' in body) {
    switch (body.type) {
      case 'TextItem':
        return {
          model: TextItemModel,
          item: { ...item, content: body.content },
        };
    }
  }
  return { model: PortfolioItemModel, item };
};

interface Req {
  params: { username?: string; portfolioItemId?: string };
  body?: PortfolioItemUnion;
  user?: { sub: string };
}

const createItem = async (req: Req, res: Res<never>) => {
  const { model, item } = extractItemFromBody(req.body);
  if (model && req.user && req.user.sub) {
    const now = new Date();
    const newItem = await model.create({
      ...item,
      created: now,
      lastModified: now,
    });
    try {
      await UserModel.findOneAndUpdate(
        { auth0Id: req.user.sub },
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

const viewItem = async (req: Req, res: Res<PortfolioItemUnion>) => {
  const { portfolioItemId } = req.params;
  try {
    const item = await PortfolioItemModel.findById(portfolioItemId);
    if (item) {
      res.send(item);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

const editItem = async (req: Req, res: Res<never>) => {
  const { portfolioItemId } = req.params;
  const { model, item } = extractItemFromBody(req.body);
  if (model && req.user && req.user.sub) {
    try {
      const user = await UserModel.findOne({ auth0Id: req.user.sub });
      // check if portfolioItemId in user portfolio
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

const viewAllItems = async (req: Req, res: Res<PortfolioItemUnion[]>) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username }).populate('portfolio');
    res.send(user.portfolio.filter(isDocument));
  } catch {
    res.sendStatus(404);
  }
};

// TODO: update auth
const deleteItem = async (req: Req, res: Res<never>) => {
  const { portfolioItemId } = req.params;
  try {
    await PortfolioItemModel.findByIdAndDelete(portfolioItemId);
    /* Note: the deleted item ID will remain in the user's portfolio array,
       but will not be returned from queries like `viewAllItems` as it is
       filtered by `isDocument`. */
    res.sendStatus(200);
  } catch {
    res.sendStatus(404);
  }
};

const viewProfile = async (req: Req, res: Res<UserProfile>) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      res.send(user.toProfile());
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
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
  deleteItem,
  viewProfile,
  editProfile,
  Req,
};
