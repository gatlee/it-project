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

/**
 * The following schemas should match the interfaces defined in '@pure-and-lazy/api-interfaces'.
 * @swagger
 * components:
 *   schemas:
 *     PortfolioItem:
 *       type: object
 *       required:
 *         - category
 *         - name
 *         - description
 *         - content
 *       properties:
 *         category:
 *           type: string
 *           enum: [projects, blog]
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         content:
 *           type: string
 *         created:
 *           type: string
 *           format: date-time
 *         lastModified:
 *           type: string
 *           format: date-time
 *     UserProfile:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - dateJoined
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         dateJoined:
 *           type: string
 *           format: date-time
 *   parameters:
 *     usernameParam:
 *       name: username
 *       in: path
 *       description: Username
 *       required: true
 *       schema:
 *         type: string
 *     portfolioItemIdParam:
 *       name: portfolioItemId
 *       in: path
 *       description: Portfolio item ID
 *       required: true
 *       schema:
 *         type: string
 *     portfolioItemParam:
 *       name: portfolioItem
 *       description: Portfolio item
 *       in: body
 *       required: true
 *       type: object
 *       schema:
 *         $ref: '#/components/schemas/PortfolioItem'
 *     userProfileParam:
 *       name: userProfile
 *       description: User profile
 *       in: body
 *       required: true
 *       type: object
 *       schema:
 *         $ref: '#/components/schemas/UserProfile'
 */

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
 * /{username}/profile:
 *   get:
 *     description: View user profile information.
 *     parameters:
 *       - $ref: '#/components/parameters/usernameParam'
 *     responses:
 *       200:
 *         description: The user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: Unknown user.
 *     tags:
 *       - /api/portfolio
 *   put:
 *     description: Edit a user's profile.
 *     parameters:
 *       - $ref: '#/components/parameters/usernameParam'
 *       - $ref: '#/components/parameters/userProfileParam'
 *     responses:
 *       200:
 *         description: Profile edited successfully.
 *       404:
 *         description: Unknown user.
 *       400:
 *         description: Malformed input.
 *     tags:
 *       - /api/portfolio
 */
router.route('/:username/profile').get(viewProfile).put(editProfile);

/**
 * @swagger
 * /{username}/all:
 *   get:
 *     description: Get all portfolio items for a user.
 *     parameters:
 *       - $ref: '#/components/parameters/usernameParam'
 *     responses:
 *       200:
 *         description: An array of portfolio items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PortfolioItem'
 *       404:
 *         description: Unknown user.
 *     tags:
 *       - /api/portfolio
 */
router.get('/:username/all', viewAllItems);

/**
 * @swagger
 * /{username}/create:
 *   post:
 *     description: Create a portfolio item.
 *     parameters:
 *       - $ref: '#/components/parameters/usernameParam'
 *       - $ref: '#/components/parameters/portfolioItemParam'
 *     responses:
 *       201:
 *         description: Portfolio item created successfully.
 *       404:
 *         description: Unknown user.
 *       400:
 *         description: Malformed input.
 *     tags:
 *       - /api/portfolio
 */
router.post('/:username/create', createItem);

/**
 * @swagger
 * /{username}/{portfolioItemId}:
 *   get:
 *     description: Get an individual portfolio item.
 *     parameters:
 *       - $ref: '#/components/parameters/usernameParam'
 *       - $ref: '#/components/parameters/portfolioItemIdParam'
 *     responses:
 *       200:
 *         description: A portfolio item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PortfolioItem'
 *       404:
 *         description: Unknown portfolio item.
 *     tags:
 *       - /api/portfolio
 *   put:
 *     description: Edit a portfolio item.
 *     parameters:
 *       - $ref: '#/components/parameters/usernameParam'
 *       - $ref: '#/components/parameters/portfolioItemIdParam'
 *       - $ref: '#/components/parameters/portfolioItemParam'
 *     responses:
 *       200:
 *         description: Portfolio item updated successfully.
 *       404:
 *         description: Unknown portfolio item.
 *       400:
 *         description: Malformed input.
 *     tags:
 *       - /api/portfolio
 *   delete:
 *     description: Delete a portfolio item.
 *     parameters:
 *       - $ref: '#/components/parameters/usernameParam'
 *       - $ref: '#/components/parameters/portfolioItemIdParam'
 *     responses:
 *       200:
 *         description: Portfolio item deleted successfully.
 *       404:
 *         description: Unknown portfolio item.
 *     tags:
 *       - /api/portfolio
 */
router
  .route('/:username/:portfolioItemId')
  .get(viewItem)
  .put(editItem)
  .delete(deleteItem);

export default router;
