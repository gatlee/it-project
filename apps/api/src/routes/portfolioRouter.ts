import { Router } from 'express';
import { checkUserAuth } from '../auth';
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

router.all('/:username/*', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    checkUserAuth(req, res, next);
  } else {
    next();
  }
});

router.get('/:username/all', viewAllItems);
router.post('/:username/create', createItem);
router.route('/:username/profile').get(viewProfile).put(editProfile);
router
  .route('/:username/:portfolioItemId')
  .get(viewItem)
  .put(editItem)
  .delete(deleteItem);

export default router;
