import { RestaurantRepository, RestaurantDTO } from "../models/restaurant";

function getAll() {
    return RestaurantRepository.selectAll();
}

function getFromId(restaurantId: string)
{
    return RestaurantRepository.getById(restaurantId);
}

function createRestaurant(restaurant: RestaurantDTO) {
    return RestaurantRepository.createRestaurant(restaurant);
}

function getFromUser(currentUserID: number) {
    return RestaurantRepository.foundRestaurantByOwner(currentUserID);
}

export default {
    getFromId,
    getAll,
    createRestaurant,
    getFromUser
}