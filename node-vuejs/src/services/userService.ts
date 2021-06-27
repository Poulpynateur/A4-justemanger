import http from './api';

import store from '../store/index';
import {UserDTO} from '../store/models/user';

const apiUrl = '/users';

function updateUserInfo(user: UserDTO)
{
    return http.delete(apiUrl + '/' + user.id)
    .then((response) => {
        store.commit('setCurrentUser', {remember: false, user: null});
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function deleteUser(userId: number)
{
    return http.delete(apiUrl + '/' + userId)
    .then((response) => {
        store.commit('setCurrentUser', {remember: false, user: null});
    }).catch((error) => {
        return Promise.reject(error.response.data.message);
    });
}

export default { updateUserInfo, deleteUser };