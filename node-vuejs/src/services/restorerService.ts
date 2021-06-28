import http from './api';

import store from '../store/index';
import {MenuDTO, ArticleDTO, RestaurantDTO} from '../store/models/restaurant';

const apiUrl = '/restaurants';

function getUserRestaurant()
{
    return Promise.reject();
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
    const me = menu as MenuDTO;
    me.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return Promise.resolve(me);
}

export default { getUserRestaurant, sendNewRestaurant, sendNewArticle, sendNewMenu };