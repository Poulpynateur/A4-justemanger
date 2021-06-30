import mongoose from "mongoose";
import {Article, ArticleDTO} from './article';

/**** ODM ****/
const orderSchema = new mongoose.Schema({
    user: Number,
    restaurant: Number,
    price: Number,
    state: String,
    articles: Array<ArticleDTO>()
});

/**** DTO ****/
export class OrderDTO {
    public id?: number;
    public restaurantId?: number;
    price?: Number;
    public userId?: number;
    public articles?: Array<ArticleDTO>

    constructor(order?: any) {
        if (order) {
            // Convert database model to DTO
            this.id = order._id;
            this.restaurantId = order.restaurant;
            this.userId = order.image;
            this.articles = order.articles;
            this.price = order.price;
        }
    }
}
export const Order = mongoose.model('Order', orderSchema)

export namespace OrderRepository {

    export function selectAll() {
        return new Promise((resolve, reject) => {
            Order.find({})
            .then((orders: any) => {
                resolve(orders.map((order: any) => new OrderDTO(order.toObject())));
            })
            .catch((error: Error) => {
                reject(error);
            });
        })
    }
    /*
    export function selectAll() {
        let errorMessage = ''
        try {
            Order.find()
            .then((doc: any)=> { 
                if (doc) {
                    return Promise.resolve(new OrderDTO(doc));
                } else {
                    errorMessage = "No order was found...";
                    console.log(errorMessage);
                    return Promise.reject(new Error(errorMessage));
                }
            })
            .catch((err: Error)=> {
                console.log(err);
                return Promise.reject(err);
            });
        } catch (error) {
            console.log(error)
            return Promise.reject(error);
        }
    }
    */

    export function selectAllFromUser(id: number) {
        let errorMessage = ''
        return new Promise((resolve, reject) => {
            Order.find().where('user').equals(id)
            .then((doc: any)=> { 
                if (doc) {
                    resolve(doc);
                } else {
                    errorMessage = "No order was found...";
                    console.log(errorMessage);
                    reject(new Error(errorMessage));
                }
            })
            .catch((err: Error)=> {
                console.log(err);
                reject(err);
            });
        }) 
    }

    export function insertOrder(orderInfo: typeof Order) {
        var order = new Order(orderInfo)
        return new Promise((resolve, reject) => {
            order.save()
            .then((err: Error, data: any) => {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
            .catch((error: Error) => {
                reject(error);
            });
        })
    }

    export function selectOrder(id: number) {
        var errorMessage = '';
        return new Promise((resolve, reject) => {
            if (mongoose.Types.ObjectId.isValid(id)) {
                Order.findById(id)
                .then((doc: typeof Order)=> { 
                    if (doc) {
                        resolve(doc);
                    } else {
                        errorMessage = "There is no order found with the following id: " + id.toString()
                        reject(new Error(errorMessage));
                    }
                })
                .catch((err: Error)=> {
                    reject(err);
                });
            } else {
                errorMessage = "The following id is not valid: " + id.toString()
                reject(new Error(errorMessage));
            }
        })
        
    }

    export function updateOrder(id: number, updatedOrder: typeof Order) {
        return new Promise((resolve, reject) => {
            if (mongoose.Types.ObjectId.isValid(id)){
                Order.findByIdAndUpdate(id, updatedOrder)
                .then((error: Error, data: any) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        console.log(data, "\nSuccessfully updated order: " + id.toString());
                        resolve(data);
                    }
                })
                .catch((err: Error)=> {
                    resolve(err);
                });
            } else {
                let errorMessage = "The following id is not valid: " + id.toString()
                resolve(new Error(errorMessage));
            }
        })
    }

    export function deleteOrder(id: number) {
        return new Promise((resolve, reject) => {
            if (mongoose.Types.ObjectId.isValid(id)){
                Order.findByIdAndRemove(id)
                .then((error: Error, data: any) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        console.log(data, "\nSuccessfully removed order: " + id.toString())
                        resolve(data);
                    }
                })
                .catch((err: Error)=> {
                    reject(err);
                });
            } else {
                let errorMessage = "The following id is not valid: " + id.toString()
                reject(new Error(errorMessage));
            }
        })
    }
}

