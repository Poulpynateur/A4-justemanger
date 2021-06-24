import * as express from "express";
import httpProxy from 'express-http-proxy';

import authMiddleware from '../middleware/authMiddleware';
import config from '../../config/config';

let router = express.Router();

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
router.post('/auth/login', httpProxy(config.services.auth + '/login'));

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
router.post('/auth/refresh', httpProxy(config.services.auth + '/refresh'));

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
router.post('/auth/verify', httpProxy(config.services.auth + '/verify'));

export default router;