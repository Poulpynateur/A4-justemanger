import express from "express";
import cors from "cors";
import morgan from 'morgan';

// Make DB accessible from everywhere
import database from './config/database';
global.db = database.connect();

import config from './config/config'
import logger from './config/logger';
import router from './API/routes/index';

/**** app setup ****/
const app = express();
app.use(cors());
app.use(express.json());

/**** error management and logging ****/
app.use(morgan('tiny', { stream: {
    write: (text: string) => {
        logger.http(text.replace(/\n$/, ''));
    }
}}));
app.use((err: any, req: any, res: any, next: any) => {
    logger.error(err);
    return res.status(err.statusCode).json(err);
});

/**** routes setup *****/
app.use('/', router);

app.use((req: any, res: any, next: any) => {
    return res.status(404).json({message: 'Unable to find the requested resource.'});
});

/**** starting ****/
app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
});