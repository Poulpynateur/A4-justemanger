import * as express from "express";
import auth from '../middleware/authMiddleware';
import articleWS from '../webservices/articleWS';

let router = express.Router();

router.post('/restaurants/:restaurantId/articles', auth.connected, articleWS.create);

router.delete('/restaurants/:restaurantId/articles/:articleId', auth.connected, articleWS.removeArticle);
router.put('/restaurants/:restaurantId/articles/:articleId', auth.connected, articleWS.updateArticle);
router.delete('/restaurants/:restaurantId/menus/:articleId', auth.connected, articleWS.removeMenu);
router.put('/restaurants/:restaurantId/menus/:articleId', auth.connected, articleWS.updateMenu);

export default router;