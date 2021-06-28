import { UserDTO } from '../store/models/user';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import store from '../store/index';

const customAxios = axios.create({
    baseURL: `http://localhost:8000`,
    headers: { 'Content-Type': 'application/json' }
});

function requestHandler(request: any) {
    if (store.state.currentUser)
        request.headers.Authorization = 'Bearer ' + store.state.currentUser.accessToken;
    return request;
};

function errorHandler(error: any){
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

const refreshAuthLogic = failedRequest => customAxios.post('/auth/refresh', {
    username: store.state.currentUser.username,
    refreshToken: store.state.currentUser.refreshToken
}).then(response => {
    const user: UserDTO = store.state.currentUser;
    user.accessToken = response.data.accessToken;
    store.commit('setCurrentUser', user);
    return Promise.resolve();
});
createAuthRefreshInterceptor(customAxios, refreshAuthLogic);

export default customAxios;