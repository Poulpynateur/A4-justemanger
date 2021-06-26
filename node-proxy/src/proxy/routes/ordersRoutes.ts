import * as express from "express";
import httpProxy from 'express-http-proxy';
import config from '../../config/config';

let router = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     description: Get list of orders. Need role "management".
 *     tags:
 *       - Orders
 *     security:
 *         - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all the orders.
 */
router.get('/orders', httpProxy(config.services.orders + '/orders'));

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     description: Get an user info. Need role "management".
 *     tags:
 *       - Orders
 *     security:
 *         - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Specific order.
 */
router.get('/orders/:id', httpProxy(config.services.orders + '/login'));

export default router;