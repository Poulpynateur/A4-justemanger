import {Request, Response} from "express";
import authService from '../../core/services/authService';

function login(req: Request, res: Response)
{
    // TODO : use validator
    authService.createTokens(req.body.username, req.body.password)
    .then((user) => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(400).json({"message": error.message});
    });
}

function refresh(req: Request, res: Response)
{
    authService.refreshAccessToken(req.body.username, req.body.refreshToken)
    .then((token) => {
        res.status(200).json({accessToken: token});
    }).catch((error) => {
        res.status(400).json({"message": error.message});
    });
}

function verify(req: Request, res: Response)
{
    authService.checkJwtToken(req.body.accessToken)
    .then((user) => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(400).json({"message": error.message});
    });
}


export default {login, refresh, verify};