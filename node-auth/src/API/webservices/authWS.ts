import {Request, Response} from "express";
import authService from '../../core/services/authService';

function login(req: Request, res: Response)
{
    authService.createTokens(req.body.username, req.body.password)
    .then((user) => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(400).json({"message": error.message});
    });
}

function refresh(req: Request, res: Response)
{
    const token = authService.getTokenFromRequest(req);
    if (token == null) return res.status(400).json({message: "No token provided."});

    authService.refreshAccessToken(token)
    .then((token) => {
        res.status(200).json({accessToken: token});
    }).catch((error) => {
        res.status(400).json({"message": error.message});
    });
}

export default {login, refresh};