import { Router } from 'express';
import * as portfolioController from '../controller/portfolioController';

const router = Router();
router.get('/', portfolioController.viewAllItems);
router.post('/add', portfolioController.addItem);
router.get('/profile', portfolioController.viewProfile);
router.put('/profile', portfolioController.editProfile);
router.get('/:portfolioItemId', portfolioController.viewItem);
router.put('/:portfolioItemId', portfolioController.editItem);

export default router;
