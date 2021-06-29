import { Restaurant, RestaurantRepository } from "core/models/restaurant";

export const restaurantService = { 
    listAll: listAll,
    create: createRestaurant,
    read: readRestaurant,
    update: updateRestaurant,
    delete: deleteRestaurant
}

export function listAll() {
    return RestaurantRepository.selectAll();
}

function createRestaurant(restaurantInfo: typeof Restaurant) {
    return RestaurantRepository.insertRestaurant(restaurantInfo);
}

function readRestaurant(id: number) {
    return RestaurantRepository.selectRestaurant(id);
}

function updateRestaurant(id: number, updatedRestaurant: typeof Restaurant) {
    return RestaurantRepository.updateRestaurant(id, updatedRestaurant);
}

function deleteRestaurant(id: number) {
    return RestaurantRepository.deleteRestaurant(id);
}

export default {
    restaurantService
}