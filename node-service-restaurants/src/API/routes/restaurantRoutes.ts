import * as express from "express";

import restaurantWS from '../webservices/restaurantWS';
import auth from '../middleware/authMiddleware';

let router = express.Router();

router.get('/restaurants/', restaurantWS.getAll);
router.post('/restaurants/', auth.connected, restaurantWS.create);
router.get('/restaurants/:id', restaurantWS.getFromId);
router.put('/restaurants/:id', auth.connected, restaurantWS.update);
// FIXME : should probably be /users/:id/restaurant
router.get('/my-restaurant', auth.connected, restaurantWS.getFromUser);

export default router;