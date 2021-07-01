import * as express from "express";
import httpProxy from 'express-http-proxy';
import config from '../../config/config';
import {customProxy} from '../proxy';

const proxy = customProxy(config.services.users);
let router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get list of users. Need role "management".
 *     tags:
 *       - Users
 *     security:
 *         - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all the users.
 */
router.get('/users', proxy('/'));
/**
 * @swagger
 * /users:
 *   post:
 *     description: Get list of orders.
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Newly created user.
 */
router.post('/users', proxy('/'));
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get user info.
 *     tags:
 *       - Users
 *     security:
 *         - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User infos.
 */
 router.get('/users/:id', proxy('/'));

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     description: Remove an user.
 *     tags:
 *       - Users
 *     security:
 *         - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User infos.
 */
router.delete('/users/:id', proxy('/'));

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     description: Update an user infos.
 *     tags:
 *       - Users
 *     security:
 *         - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all the orders.
 */
router.put('/users/:id', proxy('/'));

/**
 * @swagger
 * /orders/{id}/orders:
 *   get:
 *     description: Get user orders.
 *     tags:
 *       - Users
 *     security:
 *         - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all the user orders.
 */

/**
 * @swagger
 * /orders/{id}/orders:
 *   get:
 *     description: Create new order for an user.
 *     tags:
 *       - Users
 *     security:
 *         - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Newly created order.
 */


/**
 * @swagger
 * /orders/{id}/orders/{id}:
 *   get:
 *     description: Update an order.
 *     tags:
 *       - Users
 *     security:
 *         - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The updated order.
 */

export default router;