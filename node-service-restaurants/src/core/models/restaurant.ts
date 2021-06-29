import mongoose from "mongoose";
import {Article} from './article';

/**** ODM ****/
const restaurantSchema = mongoose.Schema({
    name: String,
    city: String,
    code: String,
    address: String,
    articles: Array<typeof Article>()
});

export const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export namespace RestaurantRepository {
    
    export function selectAll() {
        let errorMessage = ''
        try {
            Restaurant.find()
            .then((doc: any)=> { 
                if (doc) {
                    return doc;
                } else {
                    errorMessage = "No restaurant was found...";
                    console.log(errorMessage);
                    return new Error(errorMessage);
                }
            })
            .catch((err: Error)=> {
                console.log(err);
                return err;
            });
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    export function insertRestaurant(restaurantInfo: typeof Restaurant) {
        try {
            var restaurant = new Restaurant(restaurantInfo)
            restaurant.save()
            .then((err: Error, data: any) => {
                if (err) {
                    console.log(err)
                    return err
                }
                else {
                    return "Successfully inserted restaurant."; // or a promise ?
                }
            })
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    export function selectRestaurant(id: number) {
        var errorMessage = '';
        if (mongoose.Types.ObjectId.isValid(id)) {
            Restaurant.findById(id)
            .then((doc: typeof Restaurant)=> { 
                if (doc) {
                    return doc;
                } else {
                    errorMessage = "There is no restaurant found with the following id: " + id.toString()
                    console.log(errorMessage);
                }
            })
            .catch((err: Error)=> {
                console.log(err);
            });
        } else {
            errorMessage = "The following id is not valid: " + id.toString()
            console.log(errorMessage);
        }
        return new Error(errorMessage) // à revoir
    }

    export function updateRestaurant(id: number, updatedRestaurant: typeof Restaurant) {
        var errorMessage = '';
        if (mongoose.Types.ObjectId.isValid(id)){
            Restaurant.findByIdAndUpdate(id, updatedRestaurant)
            .then((error: Error, data: any) => {
                if (error) {
                    console.log(error);
                    return error
                } else {
                    console.log(data, "\nSuccessfully updated restaurant info: " + id.toString());
                    return data;
                }
            })
            .catch((err: Error)=> {
                console.log(err);
            });
        } else {
            errorMessage = "The following id is not valid: " + id.toString()
            console.log(errorMessage);
        }
        return new Error(errorMessage) 
    }

    export function deleteRestaurant(id: number) {
        var errorMessage = '';
        if (mongoose.Types.ObjectId.isValid(id)){
            Restaurant.findByIdAndRemove(id)
            .then((error: Error, data: any) => {
                if (error) {
                    console.log(error);
                    return error
                } else {
                    console.log(data, "\nSuccessfully removed restaurant: " + id.toString())
                    return data;
                }
            })
            .catch((err: Error)=> {
                console.log(err);
            });
        } else {
            errorMessage = "The following id is not valid: " + id.toString()
            console.log(errorMessage);
        }
        return new Error(errorMessage) 
    }
}

