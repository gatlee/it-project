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
 *         description:
 *           type: string
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
 *     categoryParam:
 *       name: category
 *       description: Portfolio category
 *       in: query
 *       required: false
 *       type: string
 *       schema:
 *         enum: [projects, blog]
 */

const router = Router();

router.all('/*', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    checkJwt(req, res, next);
  } else {
    next();
  }
});

/**
 * @swagger
 * /api/portfolio/{username}/profile:
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
 *       - Portfolio
 */
router.get('/:username/profile', viewProfile);

/**
 * @swagger
 * /api/portfolio/profile:
 *   put:
 *     description: Edit a user's profile.
 *     parameters:
 *       - $ref: '#/components/parameters/userProfileParam'
 *     responses:
 *       200:
 *         description: Profile edited successfully.
 *       400:
 *         description: Malformed input.
 *     tags:
 *       - Portfolio
 */
router.put('/profile', editProfile);

/**
 * @swagger
 * /api/portfolio/{username}/all:
 *   get:
 *     description: Get all portfolio items for a user.
 *     parameters:
 *       - $ref: '#/components/parameters/usernameParam'
 *       - $ref: '#/components/parameters/categoryParam'
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
 *       - Portfolio
 */
router.get('/:username/all', viewAllItems);

/**
 * @swagger
 * /api/portfolio/create:
 *   post:
 *     description: Create a portfolio item.
 *     parameters:
 *       - $ref: '#/components/parameters/portfolioItemParam'
 *     responses:
 *       201:
 *         description: Portfolio item created successfully.
 *       404:
 *         description: Unknown user.
 *       400:
 *         description: Malformed input.
 *     tags:
 *       - Portfolio
 */
router.post('/create', createItem);

/**
 * @swagger
 * /api/portfolio/{portfolioItemId}:
 *   get:
 *     description: Get an individual portfolio item.
 *     parameters:
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
 *       - Portfolio
 *   put:
 *     description: Edit a portfolio item.
 *     parameters:
 *       - $ref: '#/components/parameters/portfolioItemIdParam'
 *       - $ref: '#/components/parameters/portfolioItemParam'
 *     responses:
 *       200:
 *         description: Portfolio item updated successfully.
 *       404:
 *         description: Unknown portfolio item.
 *       400:
 *         description: Malformed input.
 *       401:
 *         description: Portfolio item belongs to another user.
 *     tags:
 *       - Portfolio
 *   delete:
 *     description: Delete a portfolio item.
 *     parameters:
 *       - $ref: '#/components/parameters/portfolioItemIdParam'
 *     responses:
 *       200:
 *         description: Portfolio item deleted successfully.
 *       404:
 *         description: Unknown portfolio item.
 *       401:
 *         description: Portfolio item belongs to another user.
 *     tags:
 *       - Portfolio
 */
router
  .route('/:portfolioItemId')
  .get(viewItem)
  .put(editItem)
  .delete(deleteItem);

export default router;
