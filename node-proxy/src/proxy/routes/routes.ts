import express from "express";

import testRoutes from './testRoutes';
import authRoutes from './authRoutes';

let router = express.Router();

/**** setup app routes ****/
router.use('/', testRoutes);
router.use('/', authRoutes);

export default router;