import jwt from 'jsonwebtoken';
import {Request} from "express";

import config from '../../config/config';

import {UserDTO} from '../models/user';
import {RestaurantDTO, RestaurantRepository} from '../models/restaurant';

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

function isRestaurantOwner(userId: number, restaurantId: string)
{
    return RestaurantRepository.getById(restaurantId)
    .then((restaurant: RestaurantDTO) => {
        if (restaurant.ownerId == userId)
            return Promise.resolve(true);
        else
            return Promise.reject(false);
    })
}

export default {
    isRestaurantOwner,
    getTokenFromRequest,
    checkJwtToken
};