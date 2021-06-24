import Sequelize from "sequelize";
import crypto from "crypto-extra";

import logger from "../../config/logger";
import config from "../../config/config";

import {Role} from "./role";

/**** ORM ****/
export const User = global.db.define('users', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    state: {
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
User.belongsTo(Role);

/**** DTO ****/
export class UserDTO {
    public username?: string;
    public firstName?: string;
    public lastName?: string;
    public role?: string;
    public accessToken?: string;
    public refreshToken?: string;

    constructor(user?: any)
    {
        if (user)
        {
            // Convert database model to DTO
            this.username = user.username;
            this.firstName = user.first_name;
            this.lastName = user.last_name;
            this.refreshToken = user.refresh_token;
            this.role = user.role.name;
        }
    }
}

/**** repository ****/
export namespace UserRepository {

    export function createNewUser(userDTO: UserDTO, password: string)
    {
        return User.create({
            username: userDTO.username,
            password: crypto.hash(password),
            first_name: userDTO.firstName,
            last_name: userDTO.lastName,
            role: {
                name: userDTO.role
            }
        }, {include: [ Role ]})
        .then((user: any) => {
            return new Promise((resolve) => {
                resolve({username: user.username, password});
            });
        });
    }

    export function updateRefreshToken(userDTO: UserDTO)
    {
        return User.findOne({ where: { username: userDTO.username }, include: [Role]})
        .then((user: any) => {
            return user.update({ refresh_token: crypto.hash(userDTO.refreshToken, {algorithm: 'SHA256'}), refresh_token_created_at: Date.now()})
        })
        .then((user: any) => {
            const loggedUser = new UserDTO(user);
            loggedUser.accessToken = userDTO.accessToken;
            return loggedUser;
        });
    }

    export function getUser(username: string)
    {
        return User.findOne({ where: { username: username }, include: [Role] })
        .then((user: any) => {
            return new Promise((resolve, reject) => {
                if (user === null)
                {
                    reject(new Error("Username not found."));
                    return;
                }
                resolve(new UserDTO(user));
            });
        });
    }

    export function checkCredentials(username: string, password: string)
    {
        return User.findOne({ where: { username: username, password: crypto.hash(password, {algorithm: 'SHA256'})}, include: [Role]})
        .then((user : any) => {
            return new Promise((resolve, reject) => {
                if (user === null)
                {
                    reject(new Error("Wrong credentials."));
                    return;
                }
                resolve(new UserDTO(user));
            });
        });
    }

    export function checkRefreshToken(username: string, refreshToken: string)
    {
        return User.findOne({ where: { username: username, refresh_token: crypto.hash(refreshToken, {algorithm: 'SHA256'})}})
        .then((user : any) => {
            return new Promise((resolve, reject) => {
                const consumptionTimeout = user.refresh_token_created_at;
                consumptionTimeout.setDate(consumptionTimeout.getDate() + config.refresh_token_validity);
                if (user === null)
                {
                    reject(new Error("Wrong credentials.")); return;
                }
                else if (consumptionTimeout > new Date())
                {
                    logger.data(user.refresh_token_created_at);
                    reject(new Error("Refresh token expired.")); return;
                }

                resolve(new UserDTO(user));
            });
        });
    }
}