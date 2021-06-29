import express from "express";

import restaurantRoutes from './restaurantRoutes';
import articlesRoutes from './articlesRoutes';

let router = express.Router();

/**** setup app routes ****/
router.use('/articles', articlesRoutes);
router.use('/restaurants', restaurantRoutes);

export default router;