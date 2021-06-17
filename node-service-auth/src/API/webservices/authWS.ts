import {Request, Response} from 'express';

import { UserDTO } from '../../core/models/user';
import authService from '../../core/services/authService';

// TODO : use validator

function login(req: Request, res: Response)
{
    authService.createTokens(req.body.username, req.body.password)
    .then((user: UserDTO) => {
        res.status(200).json(user);
    }).catch((error: Error) => {
        res.status(400).json({"message": error.message});
    });
}

function refresh(req: Request, res: Response)
{
    authService.refreshAccessToken(req.body.username, req.body.refreshToken)
    .then((token: string) => {
        res.status(200).json({accessToken: token});
    }).catch((error: Error) => {
        res.status(400).json({"message": error.message});
    });
}

function verify(req: Request, res: Response)
{
    authService.checkJwtToken(authService.getTokenFromRequest(req))
    .then((user: UserDTO) => {
        res.status(200).json(user);
    }).catch((error: Error) => {
        res.status(400).json({"message": error.message});
    });
}


export default {login, refresh, verify};