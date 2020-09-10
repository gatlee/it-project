import { Router } from 'express';
import { createUser } from '../controller/authController';

const router = Router();
// FIXME: authenticate that the request is coming from the Auth0 hook
router.post('/create-user', createUser);

export default router;
