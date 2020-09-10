import { Router } from 'express';
import {
  viewAllItems,
  createItem,
  viewProfile,
  editProfile,
  viewItem,
  editItem,
  deleteItem,
} from '../controller/portfolioController';

const router = Router();
router.get('/:username/all', viewAllItems);
router.post('/:username/create', createItem);
router.get('/:username/profile', viewProfile);
router.put('/:username/profile', editProfile);
router.get('/:username/:portfolioItemId', viewItem);
router.put('/:username/:portfolioItemId', editItem);
router.delete('/:username/:portfolioItemId', deleteItem);

export default router;
