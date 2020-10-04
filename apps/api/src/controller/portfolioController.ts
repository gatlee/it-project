import * as mongoose from 'mongoose';
import { isDocument } from '@typegoose/typegoose';
import { PortfolioItemModel } from '../models/portfolioItem';
import { UserModel } from '../models/user';
import {
  UserProfile,
  PortfolioItem,
  PortfolioCategory,
} from '@pure-and-lazy/api-interfaces';
import { Res } from './controllerUtil';

interface Req<T> {
  params: { username?: string; portfolioItemId?: string };
  query: { category?: PortfolioCategory };
  body?: T;
  user?: { sub: string };
}

const createItem = async (req: Req<PortfolioItem>, res: Res<never>) => {
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
      await PortfolioItemModel.deleteOne(newItem);
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

const viewItem = async (req: Req<{}>, res: Res<PortfolioItem>) => {
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

const editItem = async (req: Req<PortfolioItem>, res: Res<never>) => {
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
      }
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

const viewAllItems = async (req: Req<{}>, res: Res<PortfolioItem[]>) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username }).populate('portfolio');
    const docFilter = req.query.category
      ? (doc) => isDocument(doc) && doc.category == req.query.category
      : isDocument;
    res.send(user.portfolio.filter(docFilter) as PortfolioItem[]);
  } catch {
    res.sendStatus(404);
  }
};

const deleteItem = async (req: Req<{}>, res: Res<never>) => {
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

const viewProfile = async (req: Req<{}>, res: Res<UserProfile>) => {
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

const editProfile = async (req: Req<UserProfile>, res: Res<never>) => {
  try {
    const { name, description, profilePicture } = req.body;
    if (
      name !== undefined &&
      description !== undefined &&
      profilePicture !== undefined
    ) {
      await UserModel.findOneAndUpdate(
        { auth0Id: req.user.sub },
        { name, description, profilePicture }
      );
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(404);
  }
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
