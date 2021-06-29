import jwt from 'jsonwebtoken';
import {Request} from "express";
import crypto from "crypto-extra";

import config from '../../config/config';
import logger from "../../config/logger";

import {UserDTO, UserRepository} from '../models/user';

import roleService from './roleService';
import {RoleEnum} from '../models/role';

function isUsernameUnique(username: string) {
    return UserRepository.getUser(username)
    .then((user: UserDTO) => {
        return false;
    })
    .catch((error: any) => {
        return true;
    });
}

function createUser(user: UserDTO, password: string)
{
    return new Promise((resolve: (val: any) => void, reject) => {
        if (!roleService.isMemberOf(user.role, RoleEnum.ENDUSER))
            reject(new Error("The role provided cannot be registered."));
        else
            resolve({user, password});
    })
    .then((val: {user: UserDTO, password: string}) => {
        return UserRepository.createNewUser(val.user, val.password)
        .then((res: any) => {
            return createTokens(res.username, res.password);
        })
    });
    
}

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

function generateJwtToken(user: UserDTO)
{
    // don't include whole user to payload
    return jwt.sign({id: user.id, username: user.username, role: user.role}, config.jwt.private, { expiresIn: config.jwt.validity, algorithm: 'RS256' });
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
    isUsernameUnique,
    getTokenFromRequest,
    createTokens,
    refreshAccessToken,
    checkJwtToken,
    createUser
};