import express from "express";
import cors from "cors";
import morgan from 'morgan';

import config from './config/config'
import logger from './config/logger';

import router from './proxy/routes/routes';

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
    res.status(500).json({message: 'Unable to find the requested resource.'});
});

/**** routes setup *****/
app.use('/', router);

app.use((req: any, res: any, next: any) => {
    res.status(404).json({message: 'Unable to find the requested resource.'});
});

/**** starting ****/
app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
});