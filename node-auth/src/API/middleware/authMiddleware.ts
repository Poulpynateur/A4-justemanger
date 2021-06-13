import {Request, Response, NextFunction} from "express";
import authService from '../../core/services/authService';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = authService.getTokenFromRequest(req);
    if (token == null) return res.status(401).json({message: "No token provided."});
  
    authService.checkAccessToken(token)
    .then((user) => {
        req.currentUser = user;
        next();
    })
    .catch((error) => {
        res.status(401).json({message: error});
    });
}

function checkRole(req: Request, res: Response, next: NextFunction)
{
    next();
}

export default {authenticateToken, checkRole};