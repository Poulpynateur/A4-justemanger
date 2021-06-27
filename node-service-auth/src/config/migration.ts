import crypto from "crypto-extra";
import logger from "./logger";

// TODO : use enum
async function createRoles()
{
    const roleModel = await import('../core/models/role');
    roleModel.Role.bulkCreate([
        {name: roleModel.RoleEnum.ADMIN},
        {name: roleModel.RoleEnum.ENDUSER.CONSUMER},
        {name: roleModel.RoleEnum.ENDUSER.RESTORER},
        {name: roleModel.RoleEnum.ENDUSER.DELIVERY},
        {name: roleModel.RoleEnum.MANAGEMENT.COMMERCIAL},
        {name: roleModel.RoleEnum.MANAGEMENT.TECHNICAL},
        {name: roleModel.RoleEnum.DEVELOPPER}
    ]);
    return roleModel;
}

// Need to import dynamically because we have to be sure the DB is connected
// Also await since it is not possible to get previous return with then chaining
async function migrateDB()
{    
    await global.db.sync({force: true});

    const roleModel = await createRoles();

    // Default user
    const adminRole = await roleModel.Role.findOne({ where: { name: roleModel.RoleEnum.ADMIN } });
    const userModel = await import('../core/models/user');
    userModel.User.create({
        username: 'admin',
        password: crypto.hash('admin', {algorithm: 'SHA256'}),
        email: 'admin@justemanger.fr',
        first_name: 'Admin',
        last_name: 'ADMIN',
        roleId: adminRole.get('id')
    });
}

export default {migrateDB};