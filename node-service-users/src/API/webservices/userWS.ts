import { Request, Response } from "express";
import { UserDTO } from '../../core/models/user';
import { userService } from '../../core/services/userService';
import authService from '../../core/services/authService';

function readUsersList(req: Request, res: Response) {
    const userId: number = parseInt(req.params.userId);
    userService.listAll().then((users: any) => {
        res.status(200).json(users);
    })
        .catch((error: Error) => {
            res.status(400).json({ "message": error.message });
        })
    /*
        authService.isConnectedUser(userId, req.currentUser)
        .then(() => {
            userService.listAll()
            .then((users: Array<UserDTO>) => {
                res.status(200).json(users);
            }).catch((error: Error) => {
                res.status(400).json({"message": error.message});
            });
        }).catch(() => {
            res.status(403).json({"message": "Wrong user."});
        });
        res.status(200).json(userService.listAll());
    */
}
// 
// function createUser(req: Request, res: Response) {
//     res.status(200).json({ message: userService.create(req.body.user)});
// }
// 

function read(req: Request, res: Response) {
    userService.read(parseInt(req.params.userId)).then((user: UserDTO) => {
        res.status(200).json(user);
    })
        .catch((error: Error) => {
            res.status(400).json({ "message": error.message });
        })
}

// UserDTO ne contient pas de champ password
function update(req: Request, res: Response) {
    const updatedUser: UserDTO = req.body as UserDTO;
    const userId: number = parseInt(req.params.userId);

    updatedUser.id = userId;
    userService.update(updatedUser)
        .then((user: UserDTO) => {
            res.status(200).json(user);
        }).catch((error: Error) => {
            res.status(400).json({ "message": error.message });
        });
}

function remove(req: Request, res: Response) {
    const userId: number = parseInt(req.params.userId);
    userService.delete(userId)
        .then(() => {
            res.status(200).json();
        }).catch((error: Error) => {
            res.status(400).json({ "message": error.message });
        });
}

//user interface
export default {
    readUsersList,
    read,
    update,
    remove
}
