import http from './api';

import store from '../store/index';
import { ArticleDTO, RestaurantDTO } from '../store/models/restaurant';

const apiUrl = '/restaurants';

function getUserRestaurant() {
    const restaurant = new RestaurantDTO();
    restaurant.name = "Placeholder";
    restaurant.articles = [];
    restaurant.menus = [];
    return Promise.resolve(restaurant);
}

function sendNewRestaurant(restaurantInfo) {
    const restaurant = restaurantInfo as RestaurantDTO;
    restaurant.articles = [];
    restaurant.menus = [];
    return Promise.resolve(restaurant);
}

function sendNewArticle(article) {
    const art = article as ArticleDTO;
    art.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return Promise.resolve(art);
}

function sendNewMenu(menu) {
    const me = menu as ArticleDTO;
    me.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return Promise.resolve(me);
}

function updateArticle(article) {
    return Promise.resolve(article);
}
function updateMenu(menu) {
    return Promise.resolve(menu);
}

function deleteArticle(article) {
    return Promise.resolve();
}
function deleteMenu(menu) {
    return Promise.resolve();
}

export default { getUserRestaurant, sendNewRestaurant, sendNewArticle, sendNewMenu, updateArticle, updateMenu, deleteArticle, deleteMenu };