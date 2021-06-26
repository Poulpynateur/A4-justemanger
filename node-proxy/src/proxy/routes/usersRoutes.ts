import * as express from "express";
import httpProxy from 'express-http-proxy';
import config from '../../config/config';

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
router.get('/users', httpProxy(config.services.users + '/'));
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
router.post('/users', httpProxy(config.services.users + '/'));
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
 router.get('/users/:id', httpProxy(config.services.users + '/'));

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
router.delete('/users/:id', httpProxy(config.services.users + '/'));

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
router.put('/users/:id', httpProxy(config.services.users + '/'));

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
 router.get('/users/:id/orders', httpProxy(config.services.users + '/'));

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
router.post('/users/:id/orders', httpProxy(config.services.users + '/'));

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
router.put('/users/:id/orders/:id', httpProxy(config.services.users + '/'));

export default router;