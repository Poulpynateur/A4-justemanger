import * as express from "express";

import userWS from '../webservices/userWS';
import auth from '../middleware/authMiddleware';

let router = express.Router();

router.get('/', userWS.readUsersList);
// router.post('/', userWS.create);
router.get('/:id', userWS.read);
router.put('/:id', userWS.update);
router.delete('/:id', userWS.remove);

router.put('/:id', auth.connected, userWS.update);
router.delete('/:id', auth.connected, userWS.remove);

export default router;