import mongoose from "mongoose";

/*import database from '../../config/database';
database.connect()*/
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
                reject(new Error("Restaurant not found."));
        });
    }

    export function getById(restaurantId: string) {
        return Restaurant.findById(restaurantId)
            .then((restaurant: any) => {
                return withArticlesAndMenus(restaurant);
            })
    }

    export function selectAll() {
        return new Promise((resolve, reject) => {
            Restaurant.find()
            .then((restaurants: any) => {
                restaurants.map((restaurant: any) => new RestaurantDTO(restaurant.toObject()));
                resolve(restaurants)
            })
            .catch((error: Error) => {
                reject(error);
            });
        });
    }

    export function createRestaurant(restaurantDTO: RestaurantDTO) {
        const restaurant = new Restaurant({
            name: restaurantDTO.name,
            owner_id: restaurantDTO.ownerId,
            address: restaurantDTO.address,
            category: restaurantDTO.category
        });
        return new Promise((resolve, reject) => {
            restaurant.save()
            .then((newRestaurant: any) => {
                resolve(withArticlesAndMenus(newRestaurant));
            })
            .catch((error: Error) => {
                reject(error);
            }) 
        });
    }

    export function findRestaurantByOwner(currentUserID: number) {
        return new Promise((resolve, reject) => {
            Restaurant.findOne({ owner_id: currentUserID })
            .then((restaurant: any) => {
                resolve(withArticlesAndMenus(restaurant));
            })
            .catch((error: Error) => {
                reject(error);
            });
        });
    }
}

