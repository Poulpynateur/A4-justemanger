import * as express from "express";
import orderIF from '../webservices/orderWS';
import authMiddleware from '../middleware/authMiddleware';

let router = express.Router();

router.get('/', orderIF.listAll);
router.get('/user/:id', orderIF.listAllFromUser); // liste des orders d'un utilisateur
router.post('/', orderIF.create);
router.get('/:id', orderIF.read);
router.put('/:id', orderIF.update);
router.delete('/:id', orderIF.delete);

export default router;