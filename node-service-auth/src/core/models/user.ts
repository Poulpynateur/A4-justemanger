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
        unique: true,
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
    sponsor_id: {
        type: Sequelize.INTEGER
    },
    sponsor_code: {
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
    
    public id?: number;
    public username?: string;
    public sponsorCode?: string;
    public sponsorName?: string;
    public firstName?: string;
    public email?: string;
    public lastName?: string;
    public role?: string;
    public accessToken?: string;
    public refreshToken?: string;
    public state?: string;

    constructor(user?: any)
    {
        if (user)
        {
            // Convert database model to DTO
            this.id = user.id;
            this.sponsorCode = user.sponsor_code;
            this.username = user.username;
            this.email = user.email;
            this.firstName = user.first_name;
            this.lastName = user.last_name;
            this.refreshToken = user.refresh_token;
            this.role = user.role.name;
            this.state = user.state;
        }
    }
}

/**** repository ****/
export namespace UserRepository {

    export function createNewUser(userDTO: UserDTO, password: string)
    {
        return Role.findOne({where: {name: userDTO.role}})
        .then((role:any) => {
            return User.create({
                sponsor_code: crypto.randomString(6).toUpperCase(),
                username: userDTO.username,
                password: crypto.hash(password),
                email: userDTO.email,
                first_name: userDTO.firstName,
                last_name: userDTO.lastName,
                roleId: role.get('id'),
                state: 'actif'
            });
        })
        .then((user: any) => {
            if (userDTO.sponsorCode)
            {
                return User.findOne({where: {sponsor_code: userDTO.sponsorCode}})
                .then((sponsor: any) => {
                    if (sponsor)
                    {
                        user.sponsor_id = sponsor.id;
                    }
                    return user.save();
                })
            }
            else
            {
                return Promise.resolve(user);
            }
        })
        .then((user: any) => {
            return Promise.resolve({username: user.username, password});
        });
    }

    export function updateRefreshToken(userDTO: UserDTO)
    {
        return User.findOne({ where: { username: userDTO.username }, include: [Role]})
        .then((user: any) => {
            return user.update({ refresh_token: crypto.hash(userDTO.refreshToken, {algorithm: 'SHA256'}), refresh_token_created_at: Date.now()})
        })
        .then((user: any) => {
            if (user.sponsor_id)
            {
                return User.findByPk(user.sponsor_id)
                .then((sponsor: any) => {
                    if (sponsor)
                    {
                        userDTO.sponsorName = sponsor.first_name + ' ' + sponsor.last_name;
                    }
                    return Promise.resolve(user);
                });
            }
            return Promise.resolve(user);
        })
        .then((user: any) => {
            const loggedUser = new UserDTO(user);
            loggedUser.sponsorName = userDTO.sponsorName;
            // Because these values are hashed in database
            loggedUser.accessToken = userDTO.accessToken;
            loggedUser.refreshToken = userDTO.refreshToken;
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
        return User.findOne({ where: { username: username, refresh_token: crypto.hash(refreshToken, {algorithm: 'SHA256'})}, include: [Role]})
        .then((user : any) => {
            return new Promise((resolve, reject) => {
                if (user === null)
                {
                    reject(new Error("Wrong credentials.")); return;
                }

                const consumptionTimeout = user.refresh_token_created_at;
                consumptionTimeout.setDate(consumptionTimeout.getDate() + config.refresh_token_validity);
                if (consumptionTimeout < new Date())
                {
                    reject(new Error("Refresh token expired.")); return;
                }

                resolve(new UserDTO(user));
            });
        });
    }
}