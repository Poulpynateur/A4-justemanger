import dotenv from "dotenv";
import fs from 'fs';

dotenv.config();
export default {
    port: parseInt(process.env.PORT as string, 10),
    jwt: {
        public: fs.readFileSync('./ressources/public.pem', 'utf-8')
    },
    db_msql: {
        retry: 5,
        interval: 10000,
        host: process.env.DB_HOST_MSQL as string,
        name: process.env.DB_DATABASE_MSQL as string,
        username: process.env.DB_USERNAME_MSQL as string,
        password: process.env.DB_PASSWORD_MSQL as string
    },
    db_mongo: {
        host: process.env.DB_HOST_MONGO as string,
        name: process.env.DB_DATABASE_MONGO as string,
        username: process.env.DB_USERNAME_MONGO as string,
        password: process.env.DB_PASSWORD_MONGO as string
    }
};