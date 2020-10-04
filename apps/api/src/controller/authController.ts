import { Res } from './controllerUtil';
import { UserModel } from '../models/user';

interface Req {
  body?: { username?: string; email?: string; auth0Id?: string };
}

const createUser = async (req: Req, res: Res<never>) => {
  try {
    const { username, email, auth0Id } = req.body;
    if (username && email && auth0Id) {
      await UserModel.create({
        username,
        email,
        auth0Id,
        dateJoined: new Date(),
        portfolio: [],
      });
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

export { createUser };
