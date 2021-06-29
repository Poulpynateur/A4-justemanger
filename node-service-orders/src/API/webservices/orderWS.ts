import { orderService } from "core/services/orderService";
import {Request, Response} from "express";

function readOrdersList(req: Request, res: Response) {
    res.status(200).json({message: orderService.listAll()});
}

function readOrdersFromUser(req: Request, res: Response) {
    res.status(200).json({ message: orderService.listAllFromUser(req.params.id)});
}

function createOrder(req: Request, res: Response) {
    res.status(200).json({ message: orderService.create(req.data.orderInfo)});
}

function readOrder(req: Request, res: Response) {
    res.status(200).json({ message: orderService.read(req.params.id)});
}

function updateOrder(req: Request, res: Response) {
    res.status(200).json({ message: orderService.update(req.params.id, req.data.updated)});
}

function deleteOrder(req: Request, res: Response) {
    res.status(200).json({ message: orderService.delete(req.params.id)});
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
