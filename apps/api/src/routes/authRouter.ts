import { Router } from 'express';
import { createUser } from '../controller/authController';

const router = Router();

/**
 * @swagger
 * /api/auth/create-user:
 *   post:
 *     description:
 *       Create a new user.
 *       Should only be called from the Auth0 post-registration rule to handle a newly-registered user.
 *     parameters:
 *       - name: userInfo
 *         in: body
 *         description: Information about the newly registered user.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - email
 *             - auth0Id
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             auth0Id:
 *               type: string
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
 *       - Auth
 */
// FIXME: authenticate that the request is coming from the Auth0 rule
router.post('/create-user', createUser);

export default router;
