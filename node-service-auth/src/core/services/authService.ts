import jwt from 'jsonwebtoken';
import {Request} from "express";
import crypto from "crypto-extra";

import config from '../../config/config';
import logger from "../../config/logger";

import {UserDTO, UserRepository} from '../models/user';

function createTokens(username: string, password: string)
{
    return UserRepository.checkCredentials(username, password)
    .then((user: UserDTO) => {
        user.refreshToken = crypto.randomKey(256);
        user.accessToken = generateJwtToken(user);
    
        return UserRepository.updateRefreshToken(user);
    })
    .then((user: UserDTO) => {
        return user;
    });

}

function refreshAccessToken(username: string, refreshToken: string)
{
    return UserRepository.checkRefreshToken(username, refreshToken)
    .then((user: UserDTO) => {
        return generateJwtToken(user);
    });
}

/**
 * /!\ auth check need to be done before that
 * @param user 
 * @param secret 
 * @param expires 
 * @returns 
 */
function generateJwtToken(user: UserDTO)
{
    // don't include whole user to payload
    return jwt.sign({username: user.username}, config.jwt.private, { expiresIn: config.jwt.validity, algorithm: 'RS256' });
}

function checkJwtToken(token: string)
{
    return new Promise((resolve: (user: UserDTO) => void, reject: (error: Error) => void) => {
        try
        {
            const decoded: any = jwt.verify(token, config.jwt.public, {algorithms: ['RS256']});
            const user = UserRepository.getUser(decoded.username);
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
    createTokens,
    refreshAccessToken,
    checkJwtToken
};