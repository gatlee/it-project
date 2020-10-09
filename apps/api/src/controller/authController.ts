import { Res } from './controllerUtil';
import { UserModel } from '../models/user';

interface Req {
  body?: { username?: string; email?: string; auth0Id?: string };
}

const createUser = async (req: Req, res: Res<string>) => {
  try {
    const { username, email, auth0Id } = req.body;
    if (username && email && auth0Id) {
      if (await UserModel.findOne({ username: username })) {
        res.status(409);
        res.send('username taken');
        return;
      } else if (await UserModel.findOne({ auth0Id: auth0Id })) {
        res.status(409);
        res.send('auth0Id conflict');
        return;
      }

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
