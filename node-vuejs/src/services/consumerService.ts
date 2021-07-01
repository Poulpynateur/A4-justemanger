import http from './api';
import store from '../store/index';

import {OrderDTO} from '../store/models/order';
import { ArticleDTO, RestaurantDTO } from '../store/models/restaurant';
import { UserDTO } from '../store/models/user';

const apiUrl = '/orders';
function orderFromBasket(address: string)
{
    const order = new OrderDTO();
    order.restaurant = store.state.basketRestaurant as RestaurantDTO;
    order.customer = store.state.currentUser as UserDTO;
    order.address = address;
    order.date = new Date();
    order.articles = store.state.basket as ArticleDTO[];
    return http.post(apiUrl, order)
    .then((response) => {
        return Promise.resolve(response.data as RestaurantDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function getUserOrders()
{
    return http.get('/users/' + store.state.currentUser.id + '/orders')
    .then((response) => {
        return Promise.resolve(response.data as OrderDTO[]);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function filterContain(target: string, filter: string)
{
    return target.toLowerCase().includes(filter.toLowerCase());
}

export default {
    filterContain,
    getUserOrders,
    orderFromBasket
}