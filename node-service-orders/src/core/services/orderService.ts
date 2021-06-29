import { Order, OrderRepository } from "core/models/order";

export const orderService = { 
    listAll: listAll,
    listAllFromUser: listAllFromUser,
    create: createOrder,
    read: readOrder,
    update: updateOrder,
    delete: deleteOrder
}

export function listAll() {
    return OrderRepository.selectAll();
}

export function listAllFromUser(id: number) {
    return OrderRepository.selectAllFromUser(id)
}

function createOrder(order: typeof Order) {
    return OrderRepository.insertOrder(order);
}

function readOrder(id: number) {
    return OrderRepository.selectOrder(id);
}

function updateOrder(id: number, updatedOrder: typeof Order) {
    return OrderRepository.updateOrder(id, updatedOrder);
}

function deleteOrder(id: number) {
    return OrderRepository.deleteOrder(id);
}

export default {
    orderService
}