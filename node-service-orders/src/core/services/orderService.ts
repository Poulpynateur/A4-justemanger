import {OrderDTO, OrderRepository} from '../models/order';

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

function updateOrderState(orderId: string, state: string)
{
    return OrderRepository.updateOrderState(orderId, state);
}

export default {
    create,
    getFromUser,
    getFromRestaurant,
    updateOrderState
}