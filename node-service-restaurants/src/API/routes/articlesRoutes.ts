import * as express from "express";
import articleIF from '../webservices/articleWS';
import authMiddleware from '../middleware/authMiddleware';

let router = express.Router();

router.get('/', articleIF.listAll);
router.get('/restaurant/:id/articles', articleIF.listAllFromRestaurant);
router.post('/', articleIF.create);
router.get('/:id', articleIF.read);
router.put('/:id', articleIF.update);
router.delete('/:id', articleIF.delete);

export default router;