import http from './api';

import store from '../store/index';
import {User} from '../store/models/user';

// TODO : create a class that regroup requests
const apiUrl = 'http://localhost:8000';

function login(username: string, password: string): Promise<void> {
    return http.post(apiUrl + '/auth/login', {
        username: username,
        password: password
    })
    .then((response) => {
        const user: User = new User();

        user.username = response.data.username;
        user.refreshToken = response.data.refreshToken;
        user.accessToken = response.data.accessToken;

        store.commit('setCurrentUser', user);
    });
}

function disconnect(): void
{
    store.commit('deleteUser');
}

export default { login, disconnect };