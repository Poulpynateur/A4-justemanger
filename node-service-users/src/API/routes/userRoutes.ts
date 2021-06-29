import * as express from "express";
import userIF from '../webservices/userWS';
import authMiddleware from '../middleware/authMiddleware';

let router = express.Router();

router.get('/', userIF.listAll);
router.post('/', userIF.create);
router.get('/:id', userIF.read);
router.put('/:id', userIF.update);
router.delete('/:id', userIF.delete);

export default router;