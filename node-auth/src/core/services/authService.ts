import jwt from 'jsonwebtoken';
import {Request} from "express";
import randomstring from 'randomstring';

import config from '../../config/config';

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

            user.refreshToken = randomstring.generate({
                length: 256
            });
            user.accessToken = generateJwtToken(user);
    
            UserRepository.updateUser(user);
            resolve(user);
        }
        catch (error) {
            reject(error);
        }
    }); 
}

function refreshAccessToken(username: string, refreshToken: string)
{
    return new Promise((resolve: (accessToken: string) => void, reject: (error: Error) => void) => {

        try
        {
            if (!UserRepository.checkRefreshToken(username, refreshToken))
            {
                throw new Error("Refresh token is invalid.");
            }
            const user: User = UserRepository.getUser(username);
            resolve(generateJwtToken(user));
        }
        catch (error) {
            reject(error);
        }
    });
}

/**
 * /!\ auth check need to be done before that
 * @param user 
 * @param secret 
 * @param expires 
 * @returns 
 */
function generateJwtToken(user: User)
{
    // don't include whole user to payload
    return jwt.sign({username: user.username}, config.jwt.secret, { expiresIn: config.jwt.validity });
}

function checkJwtToken(token: string)
{
    return new Promise((resolve: (user: User) => void, reject: (error: Error) => void) => {
        try
        {
            const decoded: any = jwt.verify(token, config.jwt.secret);
            const user = UserRepository.getUser(decoded.username);
            resolve(user);
        }
        catch (error)
        {
            reject(error);
        }
    }); 
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
    checkJwtToken
};