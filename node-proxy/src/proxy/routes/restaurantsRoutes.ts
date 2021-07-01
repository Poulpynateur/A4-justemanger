import * as express from "express";
import config from '../../config/config';
import {customProxy} from '../proxy';

const proxy = customProxy(config.services.restaurants);
let router = express.Router();

router.post('/restaurants', proxy());
router.get('/restaurants', proxy());
router.get('/users/:userId/restaurant', proxy());
router.post('/restaurants/:id/articles', proxy());
router.get('/restaurants/:id', proxy());

router.delete('/restaurants/:restaurantId/articles/:articleId', proxy());
router.put('/restaurants/:restaurantId/articles/:articleId', proxy());
router.delete('/restaurants/:restaurantId/menus/:articleId', proxy());
router.put('/restaurants/:restaurantId/menus/:articleId', proxy());

export default router;