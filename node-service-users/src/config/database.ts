import {Sequelize} from "sequelize";
import * as tedious from 'tedious';

import mongoose from "mongoose";
import logger from './logger';

import config from './config'

let tries: number = 0;

function connect_mongo() {

    const uri: string = `mongodb://${config.db_mongo.username}:${config.db_mongo.password}@${config.db_mongo.host}/${config.db_mongo.name}`;
    const options: Object = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    mongoose.connect(uri, options).then(
        () => logger.info(`Connected to mongo DB ${config.db_mongo.name}`)
    ).catch(
        (error) => logger.error(error)
    );
}

function connect_msql() {
    const sequelize = new Sequelize(config.db_msql.name, config.db_msql.username, config.db_msql.password, {
        dialect: 'mssql',
        host: config.db_msql.host,
        dialectModule: tedious,
        logging: false
    });

    sequelize.authenticate()
    .then(() => {
        logger.info(`Connected to mysql DB ${config.db_msql.name}`);
        tries = 0;
    })
    .catch((err: any) => {
        logger.error(err);
        if (tries < config.db_msql.retry)
        {
            tries += 1;
            logger.warn("Retrying to connect to mysql DB (" + tries + ")");
            setTimeout(connect, config.db_msql.interval);
        }
    });

    return sequelize;
}

function connect()
{
    connect_mongo();
    return connect_msql();
}

export default { connect };