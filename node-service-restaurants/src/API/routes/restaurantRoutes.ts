import * as express from "express";

import restaurantWS from '../webservices/restaurantWS';
import auth from '../middleware/authMiddleware';

let router = express.Router();

router.get('/restaurants', restaurantWS.getAll);
router.post('/restaurants', auth.connected, restaurantWS.create);
router.get('/restaurants/:restaurantId', restaurantWS.getFromId);
router.put('/restaurants/:restaurantId', auth.connected, auth.isRestaurantOwner, restaurantWS.update);
// FIXME : should probably be /users/:id/restaurant
router.get('/users/:userId/restaurant', auth.connected, auth.hasRoles(['enduser.restorer']), restaurantWS.getFromUser);

export default router;