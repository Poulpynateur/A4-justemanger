import {OrderDTO, OrderRepository, orderEvent} from '../models/order';
import {UserDTO} from '../models/user';

import events from 'events';

function getAll()
{
    return OrderRepository.getAll();
}

function create(newOrder: OrderDTO)
{
    return OrderRepository.create(newOrder);
}

function getFromUser(userId: number)
{
    return OrderRepository.getFromUser(userId);
}

function getFromRestaurant(restaurantId: string)
{
    return OrderRepository.getFromRestaurant(restaurantId);
}

function updateOrder(orderId: string, state: string, deliveryBoy: UserDTO)
{
    if (deliveryBoy)
        return OrderRepository.updateOrderDelivery(orderId, state, deliveryBoy);
    else
        return OrderRepository.updateOrderState(orderId, state);
}

function getAvailableDelivery()
{
    return OrderRepository.getAvailableDelivery();
}

function getOrderFromDeliveryBoy(deliveryBoyId: number)
{
    return OrderRepository.getOrderFromDeliveryBoy(deliveryBoyId);
}

function getStats()
{
    const stats: number[] = [];
    stats.length = 24;
    stats.fill(0);
    return OrderRepository.getAll()
    .then((orders: any) => {
        orders.forEach((o:any) => {
            stats[o.date.getHours()] += 1;
        })
        return Promise.resolve(stats);
    });
}

function getOrdersStats()
{
    return OrderRepository.getTotalOrderRestaurants();
}

export default {
    getOrdersStats,
    getAll,
    create,
    getFromUser,
    getFromRestaurant,
    updateOrder,
    getAvailableDelivery,
    getOrderFromDeliveryBoy,
    getStats
}