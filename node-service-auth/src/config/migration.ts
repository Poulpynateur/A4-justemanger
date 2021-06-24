import crypto from "crypto-extra";
import logger from "./logger";

async function createRoles()
{
    const roleModel = await import('../core/models/role');
    roleModel.Role.bulkCreate([
        {name: "admin"},
        {name: "endusers.consumer"},
        {name: "endusers.restorer"},
        {name: "endusers.delivery"},
        {name: "management.commercial"},
        {name: "management.technical"},
        {name: "developper"}
    ]);
}

// Need to import dynamically because we have to be sure the DB is connected
// Also await since it is not possible to get previous return with then chaining
async function migrateDB()
{    
    await global.db.sync({force: true});

    await createRoles();

    // Default user
    const userModel = await import('../core/models/user');
    userModel.User.create({username: 'test', password: crypto.hash('test', {algorithm: 'SHA256'})});
}

export default {migrateDB};