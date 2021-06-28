import * as express from "express";

import authMiddleware from '../middleware/authMiddleware';
import config from '../../config/config';
import {customProxy} from '../proxy';

const proxy = customProxy(config.services.auth);
let router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Register a new user.
 *     tags:
 *       - Authentification
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         required: true
 *         type: string
 *       - name: password
 *         required: true
 *         type: string
 *       - name: firstName
 *         required: true
 *         type: string
 *       - name: lastName
 *         required: true
 *         type: string
 *       - name: role
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns a logged in user (including valide tokens).
 */
 router.post('/auth/register', proxy('/register'));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login a user.
 *     tags:
 *       - Authentification
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         required: true
 *         type: string
 *       - name: password
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns user info as well as refresh and access token.
 */
router.post('/auth/login', proxy('/login'));

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     description: Refresh the access token of a user.
  *     tags:
 *       - Authentification
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         required: true
 *         type: string
 *       - name: refreshToken
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return the new access token.
 */
router.post('/auth/refresh', proxy('/refresh'));

/**
 * @swagger
 * /auth/verify:
 *   post:
 *      description: Verify the validity of an access token
 *      tags:
 *         - Authentification
 *      security:
 *         - bearerAuth: []
 *      produces:
 *         - application/json
 *      responses:
 *         200:
 *            description: If the token is valide.
 */
router.get('/auth/verify', proxy('/verify'));

export default router;