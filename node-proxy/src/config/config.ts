import dotenv from "dotenv";

dotenv.config();
export default {
    API_version: 1,
    port: parseInt(process.env.PORT as string, 10),
    services: {
        auth: 'http://service-auth:3000',
        test: 'http://service-test:3000',
        users: 'http://service-users:3000',
        orders: 'http://service-orders:3000',
        restaurants: 'http://service-restaurants:3000'
    }
};