import * as mongoose from 'mongoose';
import { isDocument } from '@typegoose/typegoose';
import { PortfolioItemModel } from '../models/portfolioItem';
import { UserModel } from '../models/user';
import { UserProfile, PortfolioItem } from '@pure-and-lazy/api-interfaces';
import { Res } from './controllerUtil';

interface Req {
  params: { username?: string; portfolioItemId?: string };
  body?: PortfolioItem;
  user?: { sub: string };
}

const createItem = async (req: Req, res: Res<never>) => {
  try {
    const now = new Date();
    const newItem = await PortfolioItemModel.create({
      ...req.body,
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

const viewItem = async (req: Req, res: Res<PortfolioItem>) => {
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
  try {
    const user = await UserModel.findOne({
      auth0Id: req.user.sub,
      portfolio: mongoose.Types.ObjectId(portfolioItemId),
    });
    if (user) {
      try {
        await PortfolioItemModel.findByIdAndUpdate(portfolioItemId, {
          ...req.body,
          lastModified: new Date(),
        });
        res.sendStatus(200);
      } catch {
        res.sendStatus(404);
    } else {
      res.sendStatus(404); 
    }
  } catch {
    res.sendStatus(400);
  }
};

const viewAllItems = async (req: Req, res: Res<PortfolioItem[]>) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username }).populate('portfolio');
    res.send(user.portfolio.filter(isDocument));
  } catch {
    res.sendStatus(404);
  }
};

const deleteItem = async (req: Req, res: Res<never>) => {
  const { portfolioItemId } = req.params;
  const user = await UserModel.findOne({
    auth0Id: req.user.sub,
    portfolio: mongoose.Types.ObjectId(portfolioItemId),
  });
  if (user) {
    try {
      await PortfolioItemModel.findByIdAndDelete(portfolioItemId);
      /* Note: the deleted item ID will remain in the user's portfolio array,
         but will not be returned from queries like `viewAllItems` as it is
         filtered by `isDocument`. */
      res.sendStatus(200);
    } catch {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(401);
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
