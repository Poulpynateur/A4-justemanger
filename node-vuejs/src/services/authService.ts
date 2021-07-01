import http from './api';

import store from '../store/index';
import {UserDTO} from '../store/models/user';

// TODO : create a class that regroup requests
const apiUrl = '/auth';

function register(user: any) {
    return http.post(apiUrl + '/register', user)
    .then((response) => {
        const user: UserDTO = response.data as UserDTO;
        store.commit('setCurrentUser', user);
        return Promise.resolve(user);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function login(username: string, password: string, remember: boolean): Promise<void> {
    return http.post(apiUrl + '/login', {
        username: username,
        password: password
    })
    .then((response) => {
        store.commit('setRememberMe', remember);
        store.commit('setCurrentUser', response.data as UserDTO);
    });
}

// TODO : server delete refresh token
function disconnect(): void
{
    store.commit('deleteUser');
}

export default { register, login, disconnect };