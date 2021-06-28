import http from './api';

import store from '../store/index';
import {OrderDTO} from '../store/models/order';
import { RestaurantDTO } from '../store/models/restaurant';
import { UserDTO } from '@/store/models/user';

const apiUrl = '/deliveries';

function getActiveOrder() 
{
    return Promise.reject();
}

function getAvailableOrders()
{
    const order = new OrderDTO();
    order.restaurant = new RestaurantDTO();
    order.restaurant.name = "LeRestaurant";
    order.restaurant.address = "45 avenue du pied, Paris";
    order.state = "restaurant.finished";
    order.address = "11 rue du canard enchanté, Lingolsheim";
    order.customer = new UserDTO();
    order.customer.firstName = "Jean";
    order.customer.lastName = "GUIEL";
    order.date = new Date();
    return Promise.resolve([order]);
}

// 66
function acceptOrder(order) {
    order.state = "delivery.progress";
    return Promise.resolve(order);
}

export default { getActiveOrder, getAvailableOrders, acceptOrder };