import * as express from "express";
import config from '../../config/config';
import {customProxy} from '../proxy';

const proxy = customProxy(config.services.restaurants);
let router = express.Router();

router.post('/restaurants', proxy());
router.get('/restaurants', proxy());
router.get('/restaurants/me', proxy());

export default router;