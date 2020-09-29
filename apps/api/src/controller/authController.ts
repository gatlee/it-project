import { Res } from './controllerUtil';
import { UserModel } from '../models/user';

interface Req {
  body?: { username?: string; email?: string; auth0Id?: string };
}

const createUser = async (req: Req, res: Res<never>) => {
  try {
    const { username, email, auth0Id } = req.body;
    await UserModel.create({
      username,
      email,
      auth0Id,
      dateJoined: new Date(),
      portfolio: [],
    });
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};

export { createUser };
