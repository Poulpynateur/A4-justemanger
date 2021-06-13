import jwt from 'jsonwebtoken';
import {Request} from "express";

import config, { JWTconfig } from '../../config/config';

import {User, UserRepository} from '../models/user';

function createTokens(username: string, password: string)
{
    return new Promise((resolve: (user: User) => void, reject: (error: Error) => void) => {
        try
        {
            if (!UserRepository.checkCredentials(username, password))
            {
                throw new Error("Wrong credentials.");
            }
            
            const user: User = UserRepository.getUser(username);
    
            user.jwt.accessToken = generateToken(user, config.jwt.access);
            user.jwt.refreshToken = generateToken(user, config.jwt.refresh);
    
            resolve(user);
        }
        catch (error) {
            error.
            reject(error);
        }
    }); 
}


function refreshAccessToken(refreshToken: string)
{
    return checkToken(refreshToken, config.jwt.refresh.secret)
    .then((user) => {
        return generateToken(user, config.jwt.refresh);
    });
}

/**
 * /!\ auth check need to be done before that
 * @param user 
 * @param secret 
 * @param expires 
 * @returns 
 */
function generateToken(user: User, jwtConfig: JWTconfig)
{
    // don't include whole user to payload
    return jwt.sign({username: user.username}, jwtConfig.secret, { expiresIn: jwtConfig.validity });
}

function checkToken(token: string, secret: string)
{
    return new Promise((resolve: (user: User) => void, reject: (error: Error) => void) => {
        try
        {
            const decoded: any = jwt.verify(token, secret);
            const user = UserRepository.getUser(decoded.username);
            resolve(user);
        }
        catch (error)
        {
            reject(error);
        }
    }); 
}

function checkAccessToken(token: string)
{
    return checkToken(token, config.jwt.access.secret);
}

function getTokenFromRequest(req: Request)
{
    const authHeader = req.headers['authorization'];
    return authHeader && authHeader.split(' ')[1];
}

export default {
    getTokenFromRequest,
    createTokens,
    refreshAccessToken,
    checkAccessToken
};