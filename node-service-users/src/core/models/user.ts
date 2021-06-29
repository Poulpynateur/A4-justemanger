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

    export function selectAll() {
        try {
            return User.findAll();
        } catch (e) {
            console.log(e);
        }
    }

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
    
    export function insertUser(userInfo: typeof User)
    {
        if (!isUsernameTaken(userInfo.username as string)) {
            var newUser = User.build(userInfo);
            return newUser.save();            
        }
    }

    export function selectUser(id: number)
    {
        // faut checker ça, le double return
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

    // todo : vérification de l'existant
    export function updateUser(id: number, updatedUser: Object) {
        try {
            return User.update(updateUser, { where: { id: id } });
        } catch (e) {
            console.log(e);
        }
    }

    export function deleteUser(id: number) {
        try {
            return User.destroy({ where: { id: id } });
        } catch (e) {
            console.log(e);
        }
    }
}