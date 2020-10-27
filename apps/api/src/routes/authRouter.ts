import { Router } from 'express';
import { createUser } from '../controller/authController';

const router = Router();

/**
 * @swagger
 * /api/auth/create-user:
 *   post:
 *     description:
 *       Create a new user.
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
 *       400:
 *         description: Malformed input.
 *       409:
 *         description: \"username taken\" or \"auth0Id conflict\".
 *     tags:
 *       - Auth
 */
router.post('/create-user', createUser);

export default router;
