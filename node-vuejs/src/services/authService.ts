import http from './api';

import store from '../store/index';
import {UserDTO} from '../store/models/user';

// TODO : create a class that regroup requests
const apiUrl = 'http://localhost:8000';

function register(user: any): Promise<void> {
    console.log(user);
    return http.post(apiUrl + '/auth/register', user)
    .then((response) => {
        const user: UserDTO = response.data as UserDTO;
        store.commit('setCurrentUser', user);
    });
}

function login(username: string, password: string): Promise<void> {
    return http.post(apiUrl + '/auth/login', {
        username: username,
        password: password
    })
    .then((response) => {
        const user: UserDTO = response.data as UserDTO;
        store.commit('setCurrentUser', user);
    });
}

function disconnect(): void
{
    store.commit('deleteUser');
}

export default { register, login, disconnect };