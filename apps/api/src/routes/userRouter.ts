import { Router } from 'express';
import userController from '../controller/userController';

const userRouter = Router();
userRouter.get('/ok', userController.getOk);

export default userRouter;
