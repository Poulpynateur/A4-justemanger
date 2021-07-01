import { Request, Response } from "express";
import orderService from "../../core/services/orderService";
import { OrderDTO } from '../../core/models/order';

<<<<<<< HEAD
function readOrdersList(req: Request, res: Response) {
    orderService.listAll().then((orders: any) => {
        res.status(200).json(orders);
    })
    .catch((error: Error) => {
        res.status(200).json({message: error.message});
    })
}

function readOrdersFromUser(req: Request, res: Response) {
    res.status(200).json({ message: orderService.listAllFromUser(parseInt(req.params.id))});
}

function createOrder(req: Request, res: Response) {
    res.status(200).json({ message: orderService.create(req.body.orderInfo)});
}

function readOrder(req: Request, res: Response) {
    res.status(200).json({ message: orderService.read(parseInt(req.params.id))});
}

function updateOrder(req: Request, res: Response) {
    res.status(200).json({ message: orderService.update(parseInt(req.params.id), req.body.updated)});
}

function deleteOrder(req: Request, res: Response) {
    res.status(200).json({ message: orderService.delete(parseInt(req.params.id))});
=======
function create(req: Request, res: Response) {
    orderService.create(req.body as OrderDTO)
        .then((order: OrderDTO) => {
            res.status(200).json(order);
        }).catch((error: any) => {
            res.status(400).json({ "message": error.toString() });
        });
}

function getFromUser(req: Request, res: Response) {
    if (req.currentUser?.id) {
        orderService.getFromUser(req.currentUser?.id)
            .then((orders: OrderDTO[]) => {
                res.status(200).json(orders);
            }).catch((error: any) => {
                res.status(400).json({ "message": error.toString() });
            });
    }
    else {
        res.status(400).json({ "message": "User id missing in payload." });
    }
}

function getFromRestaurant(req: Request, res: Response) {
    orderService.getFromRestaurant(req.params.id)
        .then((orders: OrderDTO[]) => {
            res.status(200).json(orders);
        }).catch((error: any) => {
            res.status(400).json({ "message": error.toString() });
        });
}

function updateOrder(req: Request, res: Response) {
    orderService.updateOrder(req.params.id, req.body.state, req.body.deliveryBoy)
        .then((orders: OrderDTO[]) => {
            res.status(200).json(orders);
        }).catch((error: any) => {
            res.status(400).json({ "message": error.toString() });
        });
}

function getAvailableDelivery(req: Request, res: Response) {
    orderService.getAvailableDelivery()
        .then((orders: OrderDTO[]) => {
            res.status(200).json(orders);
        }).catch((error: any) => {
            res.status(400).json({ "message": error.toString() });
        });
}

function getOrderFromDeliveryBoy(req: Request, res: Response)
{
    if (req.currentUser?.id) {
        orderService.getOrderFromDeliveryBoy(req.currentUser.id)
        .then((order: OrderDTO) => {
            res.status(200).json(order);
        }).catch((error: any) => {
            res.status(400).json({ "message": error.toString() });
        });
    }
    else {
        res.status(400).json({ "message": "User id missing in payload." });
    }
>>>>>>> e535ffa6e892f6131556d3379e0e241fc87e8cbe
}

function getStats(req: Request, res: Response)
{
    orderService.getStats()
        .then((stats: any) => {
            res.status(200).json(stats);
        }).catch((error: any) => {
            res.status(400).json({ "message": error.toString() });
        });
}

export default {
    create,
    getFromUser,
    getFromRestaurant,
    updateOrder,
    getAvailableDelivery,
    getOrderFromDeliveryBoy,
    getStats
}