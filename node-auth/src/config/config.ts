import dotenv from "dotenv";

class JWTconfig {
    constructor(
        public validity: string,
        public secret: string
    ) {}
}

dotenv.config();
export type {JWTconfig};
export default {
    API_version: 1,
    jwt: {
        access: new JWTconfig(
            '1800s',
            process.env.JWT_ACCESS_SECRET as string
        ),
        refresh: new JWTconfig(
            '1 days',
            process.env.JWT_REFRESH_SECRET as string
        )
    },
    port: parseInt(process.env.PORT as string, 10),
    db: {
        retry: 5,
        interval: 10000,
        host: process.env.DB_HOST as string,
        name: process.env.DB_DATABASE as string,
        username: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string
    }
};