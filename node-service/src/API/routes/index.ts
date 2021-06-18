import express from "express";

import testRoutes from './testRoutes';

let router = express.Router();

/**** setup app routes ****/
router.use('/', testRoutes);

export default router;