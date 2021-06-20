import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import authRoutes from './authRoutes';

let router = express.Router();

/**** setup app routes ****/
router.use('/', authRoutes);

export default router;