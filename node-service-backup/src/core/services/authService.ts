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
            const user = new UserDTO(decoded.username);
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

export default {
    getTokenFromRequest,
    checkJwtToken
};