import * as express from "express";
import httpProxy from 'express-http-proxy';

import authMiddleware from '../middleware/authMiddleware';
import config from '../../config/config';

let router = express.Router();

router.get('/deliveries', httpProxy(config.services.orders + '/deliveries'));
router.get('/deliveries/:id', httpProxy(config.services.orders + '/deliveries'));
router.put('/deliveries/:id', httpProxy(config.services.orders + '/deliveries'));
router.get('/deliveries/availables', httpProxy(config.services.orders + '/deliveries'));

export default router;