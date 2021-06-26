import http from './api';

import store from '../store/index';
import {UserDTO} from '../store/models/user';

// TODO : create a class that regroup requests
const apiUrl = 'http://localhost:8000';

function register(user: any): Promise<void> {
    return http.post(apiUrl + '/auth/register', user)
    .then((response) => {
        const user: UserDTO = response.data as UserDTO;
        store.commit('setCurrentUser', user);
    }).catch((error) => {
        return new Promise((resolve, reject) => {
            reject(error.response.data);
        });
    });
}

function login(username: string, password: string, remember: boolean): Promise<void> {
    return http.post(apiUrl + '/auth/login', {
        username: username,
        password: password
    })
    .then((response) => {
        const user: UserDTO = response.data as UserDTO;
        store.commit('setCurrentUser', {remember, user});
    });
}

function disconnect(): void
{
    store.commit('deleteUser');
}

export default { register, login, disconnect };