import { Router } from 'express';
import * as authController from '../controller/authController';

// TODO: implement privacy settings for individual portfolio items and integrate with Auth0 permissions

const router = Router();
router.post('create-user', authController.createUser);

export default router;
