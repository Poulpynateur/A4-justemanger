import {User} from "../src/core/models/user"

declare global {
    namespace Express {
        export interface Request {
            currentUser?: User
        }
    }
}
