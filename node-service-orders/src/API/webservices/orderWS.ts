import { Request, Response } from "express";
import orderService from "../../core/services/orderService";
import { OrderDTO } from '../../core/models/order';

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

function getAll(req: Request, res: Response)
{
    orderService.getAll()
        .then((orders: OrderDTO[]) => {
            res.status(200).json(orders);
        }).catch((error: any) => {
            res.status(400).json({ "message": error.toString() });
        });
}

function orderSSE(req: Request, res: Response)
{
    orderService.subscribeOrderSSE((data: any) => {
        if (data.id == req.params.userId)
        {
            res.write('data: ' + data.message + '\n\n');
        }
    });

    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });

    res.write("retry: 10000\n\n");
}

export default {
    orderSSE,
    getAll,
    create,
    getFromUser,
    getFromRestaurant,
    updateOrder,
    getAvailableDelivery,
    getOrderFromDeliveryBoy,
    getStats
}