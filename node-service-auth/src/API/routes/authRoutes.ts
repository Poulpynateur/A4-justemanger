import * as express from "express";
import authWS from '../webservices/authWS';

let router = express.Router();

router.post('/login', authWS.login);
router.post('/refresh', authWS.refresh);
router.get('/verify', authWS.verify);

export default router;