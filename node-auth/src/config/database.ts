import mongoose from "mongoose";
import logger from './logger';

import config from './config'

const uri: string = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:27017/${config.db.name}`;
const options: Object = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

function connect() {
    mongoose.connect(uri, options).then(
        () => logger.info(`Connected to database ${config.db.name}`)
    ).catch(
        (error) => logger.error(error)
    );
}

export default {connect};