import Sequelize from "sequelize";
import crypto from "crypto-extra";

import logger from "../../config/logger";

/**** ORM ****/
export const User = global.db.define('users', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    refresh_token: {
        type: Sequelize.STRING(300)
    },
    refresh_token_created_at: {
        type: Sequelize.DATE
    }
},{
    timestamps: false
});

/**** DTO ****/
export class UserDTO {
    public username: string = '';
    public role?: string;
    public accessToken?: string;
    public refreshToken?: string;

    constructor(username: string)
    {this.username = username}
}

/**** repository ****/
export namespace UserRepository {

    export function updateRefreshToken(userDTO: UserDTO)
    {
        return User.findOne({ where: { username: userDTO.username } })
        .then((user: any) => {
            // TODO : add refresh_token_created_at
            return user.update({ refresh_token: crypto.hash(userDTO.refreshToken, {algorithm: 'SHA256'})})
        })
        .then((user: any) => {
            return userDTO;
        });
    }

    export function getUser(username: string)
    {
        return User.findOne({ where: { username: username } })
        .then((user: any) => {
            return new Promise((resolve, reject) => {
                if (user === null)
                {
                    reject(new Error("Username not found."));
                    return;
                }
                resolve(new UserDTO(user.username));
            });
        });
    }

    export function checkCredentials(username: string, password: string)
    {
        return User.findOne({ where: { username: username, password: crypto.hash(password, {algorithm: 'SHA256'})}})
        .then((user : any) => {
            return new Promise((resolve, reject) => {
                if (user === null)
                {
                    reject(new Error("Wrong credentials."));
                    return;
                }
                resolve(new UserDTO(user.username));
            });
        });
    }

    export function checkRefreshToken(username: string, refreshToken: string)
    {
        return User.findOne({ where: { username: username, refresh_token: crypto.hash(refreshToken, {algorithm: 'SHA256'})}})
        .then((user : any) => {
            return new Promise((resolve, reject) => {
                if (user === null)
                {
                    reject(new Error("Wrong credentials.")); return;
                }
                else if (user.refresh_token_created_at)
                {
                    logger.data(user.refresh_token_created_at);
                    reject(new Error("Refresh token expired.")); return;
                }

                resolve(new UserDTO(user.username));
            });
        });
    }
}