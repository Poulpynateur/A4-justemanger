import * as express from "express";
import authWS from '../webservices/testWS';

let router = express.Router();

router.post('/test', authWS.test);
router.post('/test-secured', authWS.test);

export default router;