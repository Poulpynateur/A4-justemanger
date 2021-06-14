import dotenv from "dotenv";

dotenv.config();
export default {
    API_version: 1,
    port: parseInt(process.env.PORT as string, 10),
    db: {
        host: process.env.DB_HOST as string,
        name: process.env.DB_DATABASE as string,
        username: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string
    }
};