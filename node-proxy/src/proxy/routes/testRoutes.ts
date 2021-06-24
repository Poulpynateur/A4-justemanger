import * as express from "express";
import httpProxy from 'express-http-proxy';

import authMiddleware from '../middleware/authMiddleware';
import config from '../../config/config';

let router = express.Router();

router.post('/test', httpProxy(config.services.test + '/'));
router.post('/test/secured', authMiddleware.authenticateToken, httpProxy(config.services.test + '/secured'));

export default router;