import http from './api';

import store from '../store/index';
import { ArticleDTO, RestaurantDTO } from '../store/models/restaurant';

const apiUrl = '/restaurants';

function getFromId(id) {
    const restaurant = new RestaurantDTO();
    restaurant.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    restaurant.name = "Placeholder";
    restaurant.category = "Sausage";
    restaurant.address = "46 rue du joyeux, Mulhouse";
    restaurant.articles = [
        {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            price: 10,
            name: "Test article"
        }
    ];
    restaurant.menus = [
        {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            price: 10,
            name: "Test menu",
            subArticles: [{
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                price: 10,
                name: "Test article"
            }]
        },

    ];
    return Promise.resolve(restaurant);
}

function getAll() {
    const restaurant = new RestaurantDTO();
    restaurant.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    restaurant.name = "Placeholder";
    restaurant.category = "Sausage";
    restaurant.address = "46 rue du joyeux, Mulhouse";
    restaurant.articles = [];
    restaurant.menus = [];
    return Promise.resolve([restaurant, restaurant]);
}

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

export default {
    getFromId, getAll, getUserRestaurant,
    sendNewRestaurant, sendNewArticle,
    updateArticle, updateMenu, deleteArticle, deleteMenu
};