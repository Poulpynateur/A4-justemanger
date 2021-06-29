import express from "express";

import restaurantRoutes from './restaurantRoutes';
import articlesRoutes from './articlesRoutes';

let router = express.Router();

/**** setup app routes ****/
router.use('/', articlesRoutes);
router.use('/', restaurantRoutes);

export default router;