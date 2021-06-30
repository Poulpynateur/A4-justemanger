import jwt from 'jsonwebtoken';
import { Request } from "express";

import config from '../../config/config';
import { UserDTO, User, UserRepository } from '../models/user';

function listAll() {
    return UserRepository.selectAll();
}

function createUser(user: typeof User) {
    return UserRepository.insertUser(user);
}

function readUser(id: number) {
    return UserRepository.selectUser(id);
}

function updatedUser(updated: UserDTO) {
    return UserRepository.updateUser(updated);
}

function deleteUser(id: number) {
    return UserRepository.deleteUser(id);
}

export default {
    updatedUser,
    deleteUser
};