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

const router = Router();

router.all('/:username/*', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    checkUserAuth(req, res, next);
  } else {
    next();
  }
});

/**
 * @swagger
 * /{username}/all:
 *   get:
 *     description: Get all portfolio items for a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A list of portfolio items
 */
router.get('/:username/all', viewAllItems);
router.post('/:username/create', createItem);
router.route('/:username/profile').get(viewProfile).put(editProfile);
router
  .route('/:username/:portfolioItemId')
  .get(viewItem)
  .put(editItem)
  .delete(deleteItem);

export default router;
