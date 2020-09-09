import { Router } from 'express';
import * as authController from '../controller/authController';

const router = Router();
// FIXME: authenticate that the request is coming from the Auth0 hook
router.post('/create-user', authController.createUser);

export default router;
