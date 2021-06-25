import {UserDTO} from "../src/core/models/user"

declare global {
    namespace Express {
        export interface Request {
            currentUser?: UserDTO
        }
    }

    namespace NodeJS {
        interface Global {
            db_msql: Sequelize;
        }
    }
}
