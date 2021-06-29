import http from './api';
import store from '../store/index';

import {OrderDTO} from '../store/models/order';

function orderFromBasket()
{
    return Promise.resolve();
}

function getUserOrders()
{
    return Promise.resolve([]);
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