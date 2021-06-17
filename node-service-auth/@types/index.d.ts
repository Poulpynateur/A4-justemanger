import {UserDTO} from "../src/core/models/user"
import Sequelize from "sequelize";

declare global {
    namespace Express {
        export interface Request {
            currentUser?: UserDTO
        }
    }

    namespace NodeJS {
        interface Global {
            db: Sequelize;
        }
    }
}
