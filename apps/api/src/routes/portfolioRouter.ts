import { Router } from 'express';
import { checkJwt } from '../auth';
import {
  viewAllPublicItems,
  viewAllItemsByJwt,
  createItem,
  viewProfile,
  viewProfileByJwt,
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
 *         image:
 *           type: string
 *           format: uri
 *         public:
 *           type: boolean
 *           default: true
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
 *         profilePicture:
 *           type: string
 *           format: uri
 *         theme:
 *           type: integer
 *           default: 0
 *         themeDark:
 *           type: boolean
 *           default: false
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
 *   securitySchemas:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
 *       400:
 *         description: Malformed input.
 *     tags:
 *       - Portfolio
 */
router.get('/:username/profile', viewProfile);

/**
 * @swagger
 * /api/portfolio/profile:
 *   get:
 *     description: View a user's profile (given only a JWT).
 *     responses:
 *       200:
 *         description: The user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: Unknown user.
 *       400:
 *         description: Malformed input.
 *     tags:
 *       - Portfolio
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 */
router.route('/profile').get(checkJwt, viewProfileByJwt).put(editProfile);

/**
 * @swagger
 * /api/portfolio/{username}/all:
 *   get:
 *     description: Get all (public) portfolio items for a user.
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
router.get('/:username/all', viewAllPublicItems);

/**
 * @swagger
 * /api/portfolio/all:
 *   get:
 *     description: Get all (both public and private) portfolio items for a user (given a JWT).
 *     parameters:
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
 *       400:
 *         description: Malformed input.
 *     tags:
 *       - Portfolio
 *     security:
 *       - bearerAuth: []
 */
router.get('/all', checkJwt, viewAllItemsByJwt);

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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 */
router
  .route('/:portfolioItemId')
  .get(viewItem)
  .put(editItem)
  .delete(deleteItem);

export default router;
