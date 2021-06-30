import http from './api';

import store from '../store/index';
import { ArticleDTO, RestaurantDTO } from '../store/models/restaurant';

const apiUrl = '/restaurants';

function getFromId(id) {
    return http.get(apiUrl + '/' + id)
    .then((response) => {
        return Promise.resolve(response.data as RestaurantDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function getAll() {
    return http.get(apiUrl)
    .then((response) => {
        return Promise.resolve(response.data as RestaurantDTO[]);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function getUserRestaurant() {
    return http.get('/my-restaurant')
    .then((response) => {
        return Promise.resolve(response.data as RestaurantDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function sendNewRestaurant(restaurantInfo) {
    return http.post(apiUrl, restaurantInfo)
    .then((response) => {
        return Promise.resolve(response.data as RestaurantDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function sendNewArticle(restaurantId, article) {
    return http.post(apiUrl + '/' + restaurantId + '/articles', article)
    .then((response) => {
        return Promise.resolve(response.data as ArticleDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function updateArticle(restaurantId, article) {
    return http.put(apiUrl + '/' + restaurantId + '/articles/' + article.id, article)
    .then((response) => {
        return Promise.resolve(response.data as ArticleDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function deleteArticle(restaurantId, article) {
    return http.delete(apiUrl + '/' + restaurantId + '/articles/' + article.id, article)
    .then((response) => {
        return Promise.resolve(response.data as ArticleDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function updateMenu(restaurantId, article) {
    return http.put(apiUrl + '/' + restaurantId + '/menus/' + article.id, article)
    .then((response) => {
        return Promise.resolve(response.data as ArticleDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function deleteMenu(restaurantId, article) {
    return http.delete(apiUrl + '/' + restaurantId + '/menus/' + article.id, article)
    .then((response) => {
        return Promise.resolve(response.data as ArticleDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}


export default {
    getFromId, getAll, getUserRestaurant,
    sendNewRestaurant, sendNewArticle,
    updateArticle, deleteArticle, updateMenu, deleteMenu
};