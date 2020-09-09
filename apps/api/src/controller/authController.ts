import { Res } from './controllerUtil';
import { UserModel } from '../models/user';

interface Req {
  body?: { username?: string; email?: string };
}

const createUser = async (req: Req, res: Res<never>) => {
  if (req.body && req.body.username && req.body.email) {
    const { username, email } = req.body;
    await UserModel.create({
      username,
      email,
      dateJoined: new Date(),
      portfolio: [],
    });
  } else {
    res.sendStatus(400);
  }
};

export { createUser };
