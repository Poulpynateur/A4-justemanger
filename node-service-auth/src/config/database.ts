import {Sequelize} from "sequelize";
import * as tedious from 'tedious';

import logger from './logger';
import config from './config'

import migration from './migration';

let tries: number = 0;

function connect() {
    const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
        dialect: 'mssql',
        host: config.db.host,
        dialectModule: tedious,
        logging: false
    });

    sequelize.authenticate()
    .then(() => {
        logger.info(`Connected to DB ${config.db.name}`);
        tries = 0;

        migration.migrateDB();
    })
    .catch((err: any) => {
        logger.error(err);
        if (tries < config.db.retry)
        {
            tries += 1;
            logger.warn("Retrying to connect to DB (" + tries + ")");
            setTimeout(connect, config.db.interval);
        }
    });

    return sequelize;
}

export default {connect};