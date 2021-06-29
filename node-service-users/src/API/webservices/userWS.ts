import us from "../../core/services/userService";
const userService = us.userService
import {Request, Response} from "express";

function readUsersList(req: Request, res: Response) {
    res.status(200).json({message: userService.listAll()});
}

function createUser(req: Request, res: Response) {
    res.status(200).json({ message: userService.create(req.data.user)});
}

function readUser(req: Request, res: Response) {
    res.status(200).json({ message: userService.read(req.params.id)});
}

function updateUser(req: Request, res: Response) {
    res.status(200).json({ message: userService.update(req.params.id, req.data.updated)});
}

function deleteUser(req: Request, res: Response) {
    res.status(200).json({ message: userService.delete(req.params.id)});
}

//user interface
export default {
    listAll: readUsersList,
    create: createUser,
    read: readUser,
    update: updateUser,
    delete: deleteUser
}
