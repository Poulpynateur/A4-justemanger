import express from "express";

import userRoutes from './userRoutes';

let router = express.Router();

/**** setup app routes ****/
router.use('/users', userRoutes);

export default router;