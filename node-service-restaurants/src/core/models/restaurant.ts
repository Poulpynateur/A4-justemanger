import mongoose from "mongoose";
import { Article, Menu, ArticleDTO } from './article';

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

    constructor(restaurant?: any) {
        if (restaurant) {
            // Convert database model to DTO
            this.id = restaurant._id;
            this.ownerId = restaurant.owner_id;
            this.name = restaurant.name;
            this.address = restaurant.address;
            this.category = restaurant.category;
        }
    }
}

/**** Repository ****/
export namespace RestaurantRepository {

    function withArticlesAndMenus(restaurant: any) {
        return new Promise((resolve, reject) => {
            if (restaurant) {
                const restaurantDto = new RestaurantDTO(restaurant);
                Article.find({ restaurantId: restaurant._id })
                .then((articles: any) => {
                    restaurantDto.articles = articles.map((article: any) => new ArticleDTO(article));
                    return Menu.find({ restaurantId: restaurant._id });
                })
                .then((menus: any) => {
                    restaurantDto.menus = menus.map((menu: any) => {
                        const menuDTO = new ArticleDTO(menu);
                        menuDTO.subArticles = menu.subArticles.map((sub: any) => new ArticleDTO(sub));
                        return menuDTO;
                    });
                    resolve(restaurantDto);
                });
            }
            else
                reject("Restaurant not found.");
        });
    }

    export function getById(restaurantId: string) {
        return Restaurant.findById(restaurantId)
            .then((restaurant: any) => {
                return withArticlesAndMenus(restaurant);
            })
    }

    export function selectAll() {
        return Restaurant.find({})
            .then((restaurants: any) => {
                return Promise.resolve(restaurants.map((restaurant: any) => new RestaurantDTO(restaurant.toObject())));
            });
    }

    export function createRestaurant(restaurantDTO: RestaurantDTO) {
        const restaurant = new Restaurant({
            name: restaurantDTO.name,
            owner_id: restaurantDTO.ownerId,
            address: restaurantDTO.address,
            category: restaurantDTO.category
        });
        return restaurant.save().then((newRestaurant: any) => {
            return withArticlesAndMenus(newRestaurant);
        });
    }

    export function foundRestaurantByOwner(currentUserID: number) {
        return Restaurant.findOne({ owner_id: currentUserID })
            .then((restaurant: any) => {
                return withArticlesAndMenus(restaurant);
            });
    }
}

