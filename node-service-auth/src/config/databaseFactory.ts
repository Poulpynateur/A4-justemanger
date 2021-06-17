import crypto from "crypto-extra";

// Create default user
function createDefault()
{
    // Need to import dynamically because we have to be sure the DB is connected
    const User = import('../core/models/user').then((user) => {
        const testUser = user.User.build({username: 'test', password: crypto.hash('test', {algorithm: 'SHA256'})});
        testUser.save();
    })
}

export default {createDefault};