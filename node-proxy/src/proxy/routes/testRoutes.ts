import * as express from "express";

import authMiddleware from '../middleware/authMiddleware';
import config from '../../config/config';
import {customProxy} from '../proxy';

const proxy = customProxy(config.services.test);

let router = express.Router();

router.get('/test', proxy('/'));
router.get('/test/secured', authMiddleware.authenticateToken, proxy('/secured'));

export default router;