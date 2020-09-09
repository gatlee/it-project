import { Router } from 'express';
import { checkJwt } from '../auth';
import * as portfolioController from '../controller/portfolioController';

// TODO: implement privacy settings for individual portfolio items and integrate with Auth0 permissions

const router = Router();
router.get('/:username/all', portfolioController.viewAllItems);
router.post('/:username/create', portfolioController.createItem);
router.get('/:username/profile', portfolioController.viewProfile);
router.put('/:username/profile', checkJwt, portfolioController.editProfile);
router.get('/:username/:portfolioItemId', portfolioController.viewItem);
router.put('/:username/:portfolioItemId', portfolioController.editItem);

export default router;
