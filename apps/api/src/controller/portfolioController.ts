import { PortfolioItemModel, TextItemModel } from '../models/portfolioItem';
import { UserModel } from '../models/user';
import { UserProfile, PortfolioItemUnion } from '@pure-and-lazy/api-interfaces';

// TODO: check auth for view/add permissions

const extractItemFromBody = (body?: PortfolioItemUnion) => {
  if (!body) {
    return null;
  }
  const item = { name: body.name, description: body.description };
  switch (body.type) {
    case 'TextItem':
      return {
        model: TextItemModel,
        item: { ...item, content: body.content },
      };
  }
};

interface Req {
  params: { username?: string; portfolioItemId?: string };
  body?: PortfolioItemUnion;
}

interface Res<T> {
  send: (T) => void;
  sendStatus: (number) => void;
}

const createItem = async (req: Req, res: Res<never>) => {
  const { username } = req.params;
  const { model, item } = extractItemFromBody(req.body);
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

const viewItem = async (req: Req, res: Res<PortfolioItemUnion>) => {
  const { portfolioItemId } = req.params;
  try {
    const item = await PortfolioItemModel.findById(portfolioItemId);
    res.send(item);
  } catch {
    res.sendStatus(404);
  }
};

const editItem = async (req: Req, res: Res<never>) => {
  const { portfolioItemId } = req.params;
  const { model, item } = extractItemFromBody(req.body);
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

const viewAllItems = async (req: Req, res: Res<PortfolioItemUnion[]>) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username }).populate('portfolio');
    res.send(user.portfolio);
  } catch {
    res.sendStatus(404);
  }
};

const viewProfile = async (req: Req, res: Res<UserProfile>) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username });
    res.send(user.toProfile());
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
  Req,
  Res,
};
