import mongoose from "mongoose";
import { ArticleDTO } from './article';

/**** ORM ****/
export const restaurantSchema = new mongoose.Schema({
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

    constructor(restaurant?: any) {
        if (restaurant) {
            // Convert database model to DTO
            this.id = restaurant._id;
            this.name = restaurant.name;
            this.address = restaurant.address;
            this.category = restaurant.category;
        }
    }
}