import * as express from "express";
import authWS from '../webservices/authWS';

let router = express.Router();

router.post('/login', authWS.login);
router.post('/refresh', authWS.refresh);
router.post('/verify', authWS.verify);

export default router;