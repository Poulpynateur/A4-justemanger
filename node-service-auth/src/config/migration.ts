import crypto from "crypto-extra";
import logger from "./logger";

// Create default user
async function createDefault()
{
    // Need to import dynamically because we have to be sure the DB is connected
    // Also await since it is not possible to get previous return with then chaining
    const userModel = await import('../core/models/user');
    await global.db.sync({force: true});

    const testUser = userModel.User.build({username: 'test', password: crypto.hash('test', {algorithm: 'SHA256'})});
    testUser.save().catch((err: any) => logger.error(err));
}

export default {createDefault};