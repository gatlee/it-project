import { Router } from 'express';
import * as authController from '../controller/authController';

const router = Router();
router.get('/log-in', authController.logIn);
router.get('/log-out', authController.logOut);
router.get('/sign-up', authController.signUp);

export default router;
