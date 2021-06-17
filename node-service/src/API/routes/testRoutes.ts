import * as express from "express";
import authWS from '../webservices/testWS';
import authMiddleware from '../middleware/authMiddleware';

let router = express.Router();

router.get('/', authWS.test);
router.get('/secured', authMiddleware.authenticateToken, authWS.testSecured);

export default router;