import { Router } from 'express';
import { logIn, logOut, signUp } from '../controller/authController';

const router = Router();
router.get('/log-in', logIn);
router.get('/log-out', logOut);
router.get('/sign-up', signUp);

export default router;
