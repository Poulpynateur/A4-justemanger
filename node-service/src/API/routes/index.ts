import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import authRoutes from './authRoutes';

let router = express.Router();

/**** test routes  ****/
router.get('/', (req, res) => {
    res.status(200).json({message: "This is a message from a public route."});
});

router.get('/secured', authMiddleware.authenticateToken, (req, res) => {
    res.status(200).json({message: "This is a message from a secured route."});
});

/**** setup app routes ****/
router.use('/auth', authRoutes);

export default router;