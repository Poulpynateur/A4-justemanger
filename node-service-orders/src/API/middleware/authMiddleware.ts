import {Request, Response, NextFunction} from "express";
import authService from '../../core/services/authService';

function connected(req: Request, res: Response, next: NextFunction) {
    const token = authService.getTokenFromRequest(req);
    if (token == null) return res.status(401).json({message: "No access token provided."});
  
    authService.checkJwtToken(token)
    .then((user) => {
        req.currentUser = user;
        next();
    })
    .catch((error) => {
        res.status(401).json({message: error});
    });
}

function hasRoles(roles: string[])
{
    return function(req: Request, res: Response, next: NextFunction) {
        if (req.currentUser?.role && roles.includes(req.currentUser.role))
            next();
        else
            res.status(403).json({message: "Connected user does not have the rights to access the ressource."});
    }
}

function isCurrentUserOrHasroles(roles: string[])
{
    return function(req: Request, res: Response, next: NextFunction) {
        if (req.currentUser?.role && roles.includes(req.currentUser.role))
            next();
        else if (parseInt(req.params.userId) == req.currentUser?.id)
            next();
        else
            res.status(403).json({message: "Connected user does not have the rights to access the ressource."});
    }
}


export default {connected, hasRoles, isCurrentUserOrHasroles};