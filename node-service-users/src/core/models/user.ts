import Sequelize from "sequelize";
import crypto from "crypto-extra";

import logger from "../../config/logger";
import config from "../../config/config";

import {Role} from "./role";

/**** ORM ****/
export const User = global.db_msql.define('users', {
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
    public firstName?: string;
    public email?: string;
    public lastName?: string;
    public role?: string;
    public accessToken?: string;
    public refreshToken?: string;

    constructor(user?: any)
    {
        if (user)
        {
            // Convert database model to DTO
            this.id = user.id;
            this.username = user.username;
            this.email = user.email;
            this.firstName = user.first_name;
            this.lastName = user.last_name;
            this.refreshToken = user.refresh_token;
            this.role = user.role.name;
        }
    }
}


/**** repository ****/
export namespace UserRepository {

    // FIXME
    export function selectAll() {
        try {
            return User.findAll();
        } catch (e) {
            console.log(e);
        }
    }

    // FIXME
    export function isUsernameTaken(username: string) {
        var bool = true;
        User.findOne({ where: {username: username}}).then( (user: typeof User) => {
            if (user == null) {
                var error = new Error("User already exists");
                console.log(error);
                // or we could decide to return error
                return false;
            }
        });
        return bool;
    }

    // FIXME
    export function isEmailRegistered(email: string) : boolean {
        var bool = true;
        User.findOne({ where: {email: email}}).then( (user: typeof User) => {
            if (user == null) {
                var error = new Error("email already registered");
                console.log(error);
                // or we could decide to return error
                bool = false;
            }
        });
        return bool;
    }

    // FIXME

    export function insertUser(userInfo: typeof User)
    {
        if (!isUsernameTaken(userInfo.username as string)) {
            var newUser = User.build(userInfo);
            return newUser.save();            
        }
    }

    // FIXME
    export function selectUser(id: number)
    {
        return User.findOne({ where: { id: id }, include: [Role] })
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

    export function updateUser(updatedUser: UserDTO) {
        return User.findOne({where: {id: updatedUser.id}, include: [Role]})
        .then((user: any) => {
            if (user)
            {
                return user.update({
                    username: updatedUser.username,
                    email: updatedUser.email,
                    first_name: updatedUser.firstName,
                    last_name: updatedUser.lastName
                });
            }
            return Promise.reject(new Error("User not found."));
        }).then((user: any) => {
            return Promise.resolve(new UserDTO(user));
        });
    }

    export function deleteUser(id: number) {
        return User.findOne({where: {id: id}, include: [Role]})
        .then((user: any) => {
            if (user) return user.destroy();
            return Promise.reject(new Error("User not found."));
        });
    }
}