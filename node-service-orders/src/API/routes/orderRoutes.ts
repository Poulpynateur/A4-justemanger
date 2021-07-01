import * as express from "express";
import auth from '../middleware/authMiddleware';
import orderWS from '../webservices/orderWS';

let router = express.Router();

router.get('/orders', auth.connected, orderWS.getAll);
router.post('/orders', auth.connected, orderWS.create);
router.put('/orders/:id', auth.connected, orderWS.updateOrder);
router.get('/users/:userId/orders', auth.connected, orderWS.getFromUser);
router.get('/restaurants/:id/stats', auth.connected, auth.hasRoles(['enduser.restorer']), orderWS.getStats);
router.get('/restaurants/:id/orders', auth.connected, orderWS.getFromRestaurant);
router.get('/deliveries/available-orders', auth.connected, auth.hasRoles(['enduser.delivery']), orderWS.getAvailableDelivery);
router.get('/users/:userId/delivery', auth.connected, orderWS.getOrderFromDeliveryBoy);

router.get('/users/:userId/orders/update', auth.connected, orderWS.orderUpdatedSSE);
router.get('/orders-notifications', auth.connected, auth.hasRoles(['enduser.restorer', 'enduser.delivery']), orderWS.orderCreatedSSE);

export default router;
