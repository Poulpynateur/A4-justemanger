import dotenv from "dotenv";

dotenv.config();
export default {
    API_version: 1,
    port: parseInt(process.env.PORT as string, 10)
};