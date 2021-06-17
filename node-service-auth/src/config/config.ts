import dotenv from "dotenv";
import fs from 'fs';

dotenv.config();
export default {
    API_version: 1,
    refresh_token_validity: 7, // days
    jwt: {
        validity: '1800s',
        private: fs.readFileSync('./ressources/private.key', 'utf-8'),
        public: fs.readFileSync('./ressources/public.pem', 'utf-8')
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