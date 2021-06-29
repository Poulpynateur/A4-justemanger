import jwt from 'jsonwebtoken';
import {Request} from "express";

import config from '../../config/config';

import {UserDTO} from '../models/user';

function checkJwtToken(token: string)
{
    return new Promise((resolve: (user: UserDTO) => void, reject: (error: Error) => void) => {
        try
        {
            const decoded: any = jwt.verify(token, config.jwt.public, {algorithms: ['RS256']});
            const user = decoded as UserDTO;
            resolve(user);
        }
        catch (error)
        {
            reject(error);
        }
    });
}

function getTokenFromRequest(req: Request) : string
{
    const authHeader = req.headers['authorization'];
    return authHeader && authHeader.split(' ')[1] || '';
}

function isConnectedUser(targetId: number, currentUser: UserDTO | undefined) {
    return new Promise((resolve, reject) => {
        if (targetId == currentUser?.id) resolve(true);
        else reject();
    });
}


export default {
    isConnectedUser,
    getTokenFromRequest,
    checkJwtToken
};