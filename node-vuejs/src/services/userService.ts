import http from './api';

import store from '../store/index';
import {UserDTO} from '../store/models/user';

const apiUrl = '/users';

function updateUserInfo(user: UserDTO)
{
    return http.put(apiUrl + '/' + user.id, user)
    .then((response) => {
        store.commit('setCurrentUser', response.data as UserDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data.message);
    });
}

function deleteUser(userId: number)
{
    return http.delete(apiUrl + '/' + userId)
    .then((response) => {
        store.commit('deleteUser');
    }).catch((error) => {
        return Promise.reject(error.response.data.message);
    });
}

export default { updateUserInfo, deleteUser };