import jwt from 'jsonwebtoken';
import { Request } from "express";

import config from '../../config/config';
import { UserDTO, User, UserRepository } from '../models/user';

export const userService = { 
    listAll: listAll,
    create: createUser,
    read: readUser,
    update: updatedUser,
    delete: deleteUser
}

export function listAll() {
    return UserRepository.selectAll();
}

export function createUser(user: typeof User) {
    return UserRepository.insertUser(user);
}

export function readUser(id: number) {
    return UserRepository.selectUser(id);
}

export function updatedUser(updated: UserDTO) {
    return UserRepository.updateUser(updated);
}

export function deleteUser(id: number) {
    return UserRepository.deleteUser(id);
}