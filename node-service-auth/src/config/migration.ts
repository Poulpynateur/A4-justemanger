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
    const consumerRole = await roleModel.Role.findOne({ where: { name: roleModel.RoleEnum.ENDUSER.CONSUMER } });
    const restorerRole = await roleModel.Role.findOne({ where: { name: roleModel.RoleEnum.ENDUSER.RESTORER } });
    const deliveryRole = await roleModel.Role.findOne({ where: { name: roleModel.RoleEnum.ENDUSER.DELIVERY } });
    const userModel = await import('../core/models/user');
    userModel.User.create({
        username: 'admin',
        password: crypto.hash('admin', {algorithm: 'SHA256'}),
        email: 'admin@justemanger.fr',
        first_name: 'Admin',
        last_name: 'ADMIN',
        roleId: adminRole.get('id'),
        state: 'actif',
        sponsor_code: 'SPECI@L',
    });
    userModel.User.create({
        username: 'resto',
        password: crypto.hash('test', {algorithm: 'SHA256'}),
        email: 'resto@resto.fr',
        first_name: 'Jean',
        last_name: 'RESTAURATEUR',
        roleId: restorerRole.get('id'),
        state: 'actif',
        sponsor_code: crypto.randomString(6).toUpperCase(),
    });
    userModel.User.create({
        username: 'deliv',
        password: crypto.hash('test', {algorithm: 'SHA256'}),
        email: 'deliv@deliv.fr',
        first_name: 'Michelle',
        last_name: 'DELIBOY',
        roleId: deliveryRole.get('id'),
        state: 'actif',
        sponsor_code: crypto.randomString(6).toUpperCase(),
    });
    userModel.User.create({
        username: 'consu',
        password: crypto.hash('test', {algorithm: 'SHA256'}),
        email: 'consu@consu.fr',
        first_name: 'Pierre',
        last_name: 'CONSUM',
        roleId: consumerRole.get('id'),
        state: 'actif',
        sponsor_code: crypto.randomString(6).toUpperCase(),
    });
}

export default {migrateDB};