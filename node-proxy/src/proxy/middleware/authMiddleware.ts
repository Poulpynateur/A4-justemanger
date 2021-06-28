import {Request, Response, NextFunction} from "express";
import authWS from '../webservices/authWS';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    authWS.authServiceVerifyToken(req)
    .then(() => {
        next();
    })
    .catch((error) => {
        res.status(401).json({message: "Access forbiden."});
    });
}

export default {authenticateToken};