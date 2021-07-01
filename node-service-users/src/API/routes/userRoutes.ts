import * as express from "express";

import userWS from '../webservices/userWS';
import auth from '../middleware/authMiddleware';

let router = express.Router();

router.get('/', userWS.readUsersList);
// router.post('/', userIF.create);
router.get('/:id', auth.connected, userWS.read);

router.put('/:id', auth.connected, userWS.update);
router.delete('/:id', auth.connected, userWS.remove);

export default router;