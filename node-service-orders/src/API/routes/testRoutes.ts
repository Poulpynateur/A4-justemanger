import * as express from "express";
import testWS from '../webservices/testWS';
import authMiddleware from '../middleware/authMiddleware';

let router = express.Router();

router.get('/', testWS.test);
router.get('/secured', authMiddleware.authenticateToken, testWS.testSecured);

export default router;

// un commentaire pour tester que le push se fait bien au bon endroit