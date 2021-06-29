import {Request, Response} from "express";
import { UserDTO } from '../../core/models/user';
import { userService } from '../../core/services/userService';
import authService from '../../core/services/authService';

// function readUsersList(req: Request, res: Response) {
//     res.status(200).json({message: userService.listAll()});
// }
// 
// function createUser(req: Request, res: Response) {
//     res.status(200).json({ message: userService.create(req.body.user)});
// }
// 
// function readUser(req: Request, res: Response) {
//     res.status(200).json({ message: userService.read(req.params.id)});
// }

function update(req: Request, res: Response) {
    const updatedUser: UserDTO = req.body as UserDTO;
    const userId: number = parseInt(req.params.id);

    authService.isConnectedUser(userId, req.currentUser)
    .then(() => {
        updatedUser.id = userId;
        userService.update(updatedUser)
        .then((user: UserDTO) => {
            res.status(200).json(user);
        }).catch((error: Error) => {
            res.status(400).json({"message": error.message});
        });
    }).catch(() => {
        res.status(403).json({"message": "Wrong user."});
    });
}

function remove(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id);
    authService.isConnectedUser(userId, req.currentUser)
    .then(() => {
        userService.delete(userId)
        .then(() => {
            res.status(200).json();
        }).catch((error: Error) => {
            res.status(400).json({"message": error.message});
        });
    }).catch(() => {
        res.status(403).json({"message": "Wrong user."});
    });
}

//user interface
export default {
    update,
    remove
}
