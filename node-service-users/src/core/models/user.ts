import Sequelize from "sequelize";
// import crypto from "crypto-extra";

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
            this.role = user.role; // getRole().name
        }
    }
}


/**** repository ****/
export namespace UserRepository {

    export function selectAll() {
        
        return User.findAll()
        .then((users: any) => {
            if (users) {
                //return Promise.resolve(users);
                
                let DTOusers = [];
                for (let user of users) {
                    DTOusers.push(new UserDTO(user))
                }
                return Promise.resolve(DTOusers);
                
            }
            return Promise.reject(new Error("No data."))
        })       
    }

    // FIXME - fixed, untested
    export function isUsernameTaken(username: string) {
        return User.findOne({ where: {username: username}}).then((user: any) => {
            if (user) {
                return Promise.reject(new Error("Username already taken."));
            } else {
                return Promise.resolve(false);
            }
        });
    }

    // FIXME - fixed, untested
    function isEmailRegistered(email: string) : boolean {
        return User.findOne({ where: {email: email}}).then((user: any) => {
            if (user) {
                return Promise.reject(new Error("email already registered"));
            } else {
                return Promise.resolve(false);
            }
        });
    }

    // FIXME
    export function insertUser(userInfo: typeof User)
    {
        isUsernameTaken(userInfo.username as string).then((isTaken: Boolean) => {
            if (isTaken) {
                return new Error("user name is not available...");
            } else {
                var newUser = User.build(userInfo);
                return Promise.resolve(newUser.save());
            }
        })
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