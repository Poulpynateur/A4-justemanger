import express from "express";
import cors from "cors";
import morgan from 'morgan';

import config from './config/config'
import database from './config/database';
import logger from './config/logger';

import router from './API/routes/index';

// database.connect();

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
    logger.error(err.stack);
    res.status(500).json({msg: 'An error occured'});
});

/**** routes setup *****/
const routes_path = '/api/v' + config.API_version;
app.use('/', router);

/**** starting ****/
app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
});