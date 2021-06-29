import {Request, Response} from "express";

import restaurantService from "../../core/services/restaurantService";
import { RestaurantDTO } from "../../core/models/restaurant";

function getAll(req: Request, res: Response) {
    restaurantService.getAll()
    .then((restaurants: RestaurantDTO[]) => {
        res.status(200).json(restaurants);
    }).catch((error: any) => {
        res.status(400).json({"message": error});
    });
}


function create(req: Request, res: Response)
{
    restaurantService.createRestaurant(req.body as RestaurantDTO)
    .then((restaurant: RestaurantDTO) => {
        res.status(200).json(restaurant);
    }).catch((error: any) => {
        console.log(error);
        res.status(400).json({"message": error.toString()});
    });
}

function getFromId(req: Request, res: Response)
{
    restaurantService.createRestaurant(req.body as RestaurantDTO)
    .then((restaurant: RestaurantDTO) => {
        res.status(200).json(restaurant);
    }).catch((error: any) => {
        console.log(error);
        res.status(400).json({"message": error.toString()});
    });
}

function update(req: Request, res: Response)
{
    res.status(501).json({"message": "TODO"});
}

function getFromUser(req: Request, res: Response)
{
    console.log("AGA WOWOWOWOT");
    if (req.currentUser?.id)
    {
        restaurantService.getFromUser(req.currentUser?.id)
        .then((restaurant: RestaurantDTO) => {
            res.status(200).json(restaurant);
        }).catch((error: any) => {
            console.log(error);
            res.status(400).json({"message": error.toString()});
        });
    }
    else
    {
        res.status(400).json({"message": "User id missing in payload."});
    }
}

//user interface
export default {
    getAll,
    create,
    getFromId,
    update,
    getFromUser
}