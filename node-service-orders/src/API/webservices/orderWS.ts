import { orderService } from "core/services/orderService";
import {Request, Response} from "express";

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
}

//user interface
export default {
    listAll: readOrdersList,
    listAllFromUser: readOrdersFromUser,
    create: createOrder,
    read: readOrder,
    update: updateOrder,
    delete: deleteOrder
}
