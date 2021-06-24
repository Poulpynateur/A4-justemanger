import express from "express";

import testRoutes from './testRoutes';
import authRoutes from './authRoutes';
import usersRoutes from './usersRoutes';
import ordersRoutes from './ordersRoutes';
import restaurantsRoutes from './restaurantsRoutes';

let router = express.Router();

/**** setup app routes ****/
router.use('/', testRoutes);
router.use('/', authRoutes);
router.use('/', usersRoutes);
router.use('/', ordersRoutes);
router.use('/', restaurantsRoutes);

export default router;