import * as express from "express";
import httpProxy from 'express-http-proxy';
import config from '../../config/config';

let router = express.Router();

router.get('/restaurants', httpProxy(config.services.restaurants + '/'));
router.get('/restaurants/:id', httpProxy(config.services.restaurants + '/'));
router.delete('/restaurants/:id', httpProxy(config.services.restaurants + '/'));
router.put('/restaurants/:id', httpProxy(config.services.restaurants + '/'));
router.get('/restaurants/:id/orders', httpProxy(config.services.restaurants + '/'));
router.delete('/restaurants/:id/orders', httpProxy(config.services.restaurants + '/'));
router.put('/restaurants/:id/orders/:id', httpProxy(config.services.restaurants + '/'));
router.get('/restaurants/:id/articles', httpProxy(config.services.restaurants + '/'));
router.post('/restaurants/:id/articles', httpProxy(config.services.restaurants + '/'));
router.get('/restaurants/:id/articles/:id', httpProxy(config.services.restaurants + '/'));
router.delete('/restaurants/:id/articles/:id', httpProxy(config.services.restaurants + '/'));
router.put('/restaurants/:id/articles/:id', httpProxy(config.services.restaurants + '/'));
router.get('/restaurants/:id/articles/statistics', httpProxy(config.services.restaurants + '/'));
router.get('/restaurants/:id/articles/:id/statistics', httpProxy(config.services.restaurants + '/'));
router.get('/restaurants/:id/menus', httpProxy(config.services.restaurants + '/'));
router.post('/restaurants/:id/menus', httpProxy(config.services.restaurants + '/'));
router.get('/restaurants/:id/menus/:id', httpProxy(config.services.restaurants + '/'));
router.delete('/restaurants/:id/menus/:id', httpProxy(config.services.restaurants + '/'));
router.put('/restaurants/:id/menus/:id', httpProxy(config.services.restaurants + '/'));
router.get('/restaurants/:id/statistics', httpProxy(config.services.restaurants + '/'));

export default router;