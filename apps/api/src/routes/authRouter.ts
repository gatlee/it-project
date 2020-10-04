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
 *       201:
 *         description: User successfully created.
 *       404:
 *         description: Malformed input.
 *     tags:
 *       - Auth
 */
router.post('/create-user', createUser);

export default router;
