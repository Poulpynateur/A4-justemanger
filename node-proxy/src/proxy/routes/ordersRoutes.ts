import * as express from "express";
import httpProxy from 'express-http-proxy';
import config from '../../config/config';
import {customProxy} from '../proxy';

const proxy = customProxy(config.services.orders);
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
router.post('/orders', proxy());


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
router.get('/orders', proxy());
router.get('/my-orders', proxy());
router.get('/restaurants/:id/stats', proxy());
router.get('/restaurants/:id/orders', proxy());
router.put('/orders/:id', proxy());
router.get('/deliveries/available-orders', proxy());
router.get('/deliveries/me', proxy());

export default router;