import * as express from "express";
import auth from '../middleware/authMiddleware';
import articleWS from '../webservices/articleWS';

let router = express.Router();

router.post('/restaurants/:restaurantId/articles', auth.connected, auth.isRestaurantOwner, articleWS.create);

router.delete('/restaurants/:restaurantId/articles/:articleId', auth.connected, auth.isRestaurantOwner, articleWS.removeArticle);
router.put('/restaurants/:restaurantId/articles/:articleId', auth.connected, auth.isRestaurantOwner, articleWS.updateArticle);
router.delete('/restaurants/:restaurantId/menus/:articleId', auth.connected, auth.isRestaurantOwner, articleWS.removeMenu);
router.put('/restaurants/:restaurantId/menus/:articleId', auth.connected, auth.isRestaurantOwner, articleWS.updateMenu);

export default router;