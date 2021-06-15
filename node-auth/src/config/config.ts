import dotenv from "dotenv";

dotenv.config();
export default {
    API_version: 1,
    jwt: {
        validity: '1800s',
        secret: process.env.JWT_ACCESS_SECRET as string
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