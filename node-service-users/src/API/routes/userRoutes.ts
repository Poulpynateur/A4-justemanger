import * as express from "express";

import userWS from '../webservices/userWS';
import auth from '../middleware/authMiddleware';

let router = express.Router();

const managementRoles = ['management.commercial', 'management.technical', 'admin'];

router.get('/',
    auth.connected,
    auth.hasRoles(managementRoles),
    userWS.readUsersList);
// router.post('/', userIF.create);
router.get('/:userId',
    auth.connected,
    auth.isCurrentUserOrHasroles(managementRoles),
    userWS.read);
router.put('/:userId',
    auth.connected,
    auth.isCurrentUserOrHasroles(managementRoles),
    userWS.update);
router.delete('/:userId',
    auth.connected,
    auth.isCurrentUserOrHasroles(managementRoles),
    userWS.remove);

export default router;