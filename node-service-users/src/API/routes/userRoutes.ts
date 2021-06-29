import * as express from "express";

import userWS from '../webservices/userWS';
import auth from '../middleware/authMiddleware';

let router = express.Router();

// router.get('/', userIF.listAll);
// router.post('/', userIF.create);
// router.get('/:id', userIF.read);
// router.put('/:id', userIF.update);
// router.delete('/:id', userIF.delete);

router.put('/:id', auth.connected, userWS.update);
router.delete('/:id', auth.connected, userWS.remove);

export default router;