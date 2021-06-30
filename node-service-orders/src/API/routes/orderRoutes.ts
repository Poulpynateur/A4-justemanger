import * as express from "express";
import auth from '../middleware/authMiddleware';
import orderWS from '../webservices/orderWS';

let router = express.Router();

router.post('/orders', auth.connected, orderWS.create);
router.put('/orders/:id', auth.connected, orderWS.updateOrderState);
router.get('/my-orders', auth.connected, orderWS.getFromUser);
router.get('/restaurants/:id/orders', auth.connected, orderWS.getFromRestaurant);

export default router;