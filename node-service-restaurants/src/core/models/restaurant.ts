import mongoose from "mongoose";
import {ArticleDTO, articleSchema} from './article';

/**** ORM ****/
const restaurantSchema = new mongoose.Schema({
    owner_id: Number,
    name: String,
    address: String,
    category: String,
});
export const Restaurant = mongoose.model('Restaurant', restaurantSchema)

/**** DTO ****/
export class RestaurantDTO {
    public id?: string;
    public ownerId?: number;
    public name?: string;
    public address?: string;
    public category?: string;
    public articles?: ArticleDTO[];
    public menus?: ArticleDTO[]; // articles with subArticles

    constructor(restaurant?: any)
    {
        if (restaurant)
        {
            // Convert database model to DTO
            this.id = restaurant._id;
            this.name = restaurant.name;
            this.address = restaurant.address;
            this.category = restaurant.category;
        }
    }
}

/**** Repository ****/
export namespace RestaurantRepository {

    export function getById(restaurantId: string) {
        return Restaurant.findById(restaurantId)
        .then((restaurant: any) => {
            return Promise.resolve(new RestaurantDTO(restaurant));
        })
    }

    export function selectAll() {
        return Restaurant.find({})
        .then((restaurants: any) => {
            return Promise.resolve(restaurants.map((restaurant: any) => new RestaurantDTO(restaurant.toObject())));
        });
    }

    export function createRestaurant(restaurantDTO: RestaurantDTO) {
        console.log(restaurantDTO);
        const restaurant = new Restaurant({
            name: restaurantDTO.name,
            owner_id: restaurantDTO.ownerId,
            address: restaurantDTO.address,
            category: restaurantDTO.category
        });
        return restaurant.save().then((newRestaurant: any) => {
            return Promise.resolve(new RestaurantDTO(newRestaurant));
        });
    }

    export function foundRestaurantByOwner(currentUserID: number) {
        return Restaurant.findOne({owner_id: currentUserID})
        .then((restaurant: any) => {
            return Promise.resolve(new RestaurantDTO(restaurant));
        });
    }
}

