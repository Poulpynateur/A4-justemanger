import * as express from "express";
import httpProxy from 'express-http-proxy';

import authMiddleware from '../middleware/authMiddleware';

const serviceUrl: string = 'http://service-auth:3000';

let router = express.Router();

router.post('/test', httpProxy(serviceUrl + '/'));
router.post('/test/secured', authMiddleware.authenticateToken, httpProxy(serviceUrl + '/secured'));

export default router;