import * as express from "express";
import restaurantIF from '../webservices/restaurantWS';
import authMiddleware from '../middleware/authMiddleware';

let router = express.Router();

router.get('/', restaurantIF.listAll);
router.post('/', restaurantIF.create);
router.get('/:id', restaurantIF.read);
router.put('/:id', restaurantIF.update);
router.delete('/:id', restaurantIF.delete);

export default router;