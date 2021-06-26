import {RoleEnum} from '../models/role';

function isRole(roleTarget: string | undefined, roleCheck: string)
{
    return roleCheck == roleTarget;
}

function isMemberOf(roleTarget: string | undefined, group: any)
{
    if (!roleTarget) return false;
    return group.name == roleTarget.split('.')[0];
}

export default {
    isRole,
    isMemberOf
};