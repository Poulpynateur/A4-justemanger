import express from "express";

import orderRoutes from './orderRoutes';

let router = express.Router();

/**** setup app routes ****/
router.use('/orders', orderRoutes);

export default router;