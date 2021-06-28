import http from './api';

import store from '../store/index';
import {OrderDTO} from '../store/models/order';

const apiUrl = '/deliveries';

function getActiveOrder() 
{
    const order = new OrderDTO();
    return Promise.resolve(order);
}

function getAvailableOrders()
{

}

export default { };