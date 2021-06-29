import { restaurantService } from "core/services/restaurantService";
import {Request, Response} from "express";

function readRestaurantsList(req: Request, res: Response) {
    res.status(200).json({message: restaurantService.listAll()});
}

function createRestaurant(req: Request, res: Response) {
    res.status(200).json({ message: restaurantService.create(req.data.restaurantInfo)});
}

function readRestaurant(req: Request, res: Response) {
    res.status(200).json({ message: restaurantService.read(req.params.id)});
}

function updateRestaurant(req: Request, res: Response) {
    res.status(200).json({ message: restaurantService.update(req.params.id, req.data.updated)});
}

function deleteRestaurant(req: Request, res: Response) {
    res.status(200).json({ message: restaurantService.delete(req.params.id)});
}

//user interface
export default {
    listAll: readRestaurantsList,
    create: createRestaurant,
    read: readRestaurant,
    update: updateRestaurant,
    delete: deleteRestaurant
}
