import { Router } from 'express';
import * as portfolioController from '../controller/portfolioController';

const router = Router();
router.get('/:username/all', portfolioController.viewAllItems);
router.post('/:username/create', portfolioController.createItem);
router.get('/:username/profile', portfolioController.viewProfile);
router.put('/:username/profile', portfolioController.editProfile);
router.get('/:username/:portfolioItemId', portfolioController.viewItem);
router.put('/:username/:portfolioItemId', portfolioController.editItem);

export default router;
