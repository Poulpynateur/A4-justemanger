import mongoose from "mongoose";
import {Article} from './article';

/**** ODM ****/
const orderSchema = mongoose.Schema({
    user: Number,
    restaurant: Number,
    state: String,
    articles: Array<typeof Article>()
});

export const Order = mongoose.model('Order', orderSchema)

export namespace OrderRepository {
    
    export function selectAll() {
        let errorMessage = ''
        try {
            Order.find()
            .then((doc: any)=> { 
                if (doc) {
                    return doc;
                } else {
                    errorMessage = "No order was found...";
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

    export function selectAllFromUser(id: number) {
        let errorMessage = ''
        try {
            Order.find().where('user').equals(id)
            .then((doc: any)=> { 
                if (doc) {
                    return doc;
                } else {
                    errorMessage = "No order was found...";
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

    export function insertOrder(orderInfo: typeof Order) {
        try {
            var order = new Order(orderInfo)
            order.save()
            .then((err: Error, data: any) => {
                if (err) {
                    console.log(err)
                    return err
                }
                else {
                    return "Successfully inserted order."; // or a promise ?
                }
            })
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    export function selectOrder(id: number) {
        var errorMessage = '';
        if (mongoose.Types.ObjectId.isValid(id)) {
            Order.findById(id)
            .then((doc: typeof Order)=> { 
                if (doc) {
                    return doc;
                } else {
                    errorMessage = "There is no order found with the following id: " + id.toString()
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

    export function updateOrder(id: number, updatedOrder: typeof Order) {
        var errorMessage = '';
        if (mongoose.Types.ObjectId.isValid(id)){
            Order.findByIdAndUpdate(id, updatedOrder)
            .then((error: Error, data: any) => {
                if (error) {
                    console.log(error);
                    return error
                } else {
                    console.log(data, "\nSuccessfully updated order: " + id.toString());
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

    export function deleteOrder(id: number) {
        var errorMessage = '';
        if (mongoose.Types.ObjectId.isValid(id)){
            Order.findByIdAndRemove(id)
            .then((error: Error, data: any) => {
                if (error) {
                    console.log(error);
                    return error
                } else {
                    console.log(data, "\nSuccessfully removed order: " + id.toString())
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

