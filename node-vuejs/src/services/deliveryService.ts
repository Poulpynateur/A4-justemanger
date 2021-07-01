import http from './api';

import store from '../store/index';
import {OrderDTO} from '../store/models/order';
import { RestaurantDTO } from '../store/models/restaurant';
import { UserDTO } from '@/store/models/user';

const apiUrl = '/deliveries';

function getActiveOrder() 
{
    return http.get('/users/' + store.state.currentUser.id + '/delivery')
    .then((response) => {
        return Promise.resolve(response.data as OrderDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function getAvailableOrders()
{
    return http.get(apiUrl + '/available-orders')
    .then((response) => {
        return Promise.resolve(response.data as OrderDTO[]);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

// 66
function acceptOrder(orderId) {
    return http.put('/orders/' + orderId, {state: 'delivery.progress', deliveryBoy: store.state.currentUser})
    .then((response) => {
        return Promise.resolve(response.data as OrderDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function abortOrder(orderId) {
    return http.put('/orders/' + orderId, {state: 'restaurant.finished'})
    .then((response) => {
        return Promise.resolve(response.data as OrderDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

function finishOrder(orderId) {
    return http.put('/orders/' + orderId, {state: 'delivery.end'})
    .then((response) => {
        return Promise.resolve(response.data as OrderDTO);
    }).catch((error) => {
        return Promise.reject(error.response.data);
    });
}

export default { getActiveOrder, getAvailableOrders, acceptOrder, abortOrder, finishOrder };