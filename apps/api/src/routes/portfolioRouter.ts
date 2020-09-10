import { Router } from 'express';
import { checkJwt } from '../auth';
import {
  viewAllItems,
  createItem,
  viewProfile,
  editProfile,
  viewItem,
  editItem,
  deleteItem,
} from '../controller/portfolioController';

// TODO: implement privacy settings for individual portfolio items and integrate with Auth0 permissions

const router = Router();
router.get('/:username/all', viewAllItems);
router.post('/:username/create', checkJwt, createItem);
router.get('/:username/profile', viewProfile);
router.put('/:username/profile', checkJwt, editProfile);
router.get('/:username/:portfolioItemId', viewItem);
router.put('/:username/:portfolioItemId', checkJwt, editItem);
router.delete('/:username/:portfolioItemId', checkJwt, deleteItem);

export default router;
