import mongoose from "mongoose";
import { articleSchema, menuSchema, Article, Menu, ArticleDTO } from './article';
import { userSchema, User, UserDTO } from './user';
import { restaurantSchema, Restaurant, RestaurantDTO } from './restaurant';
/**** ORM ****/
const orderSchema = new mongoose.Schema({
    delivery_boy: userSchema,
    customer: userSchema,
    restaurant: restaurantSchema,
    state: String,
    articles: [articleSchema],
    menus: [menuSchema],
    address: String,
    date: Date
});
export const Order = mongoose.model('Order', orderSchema)

/**** DTO ****/
export class OrderDTO {
    public id?: string;
    public customer?: UserDTO;
    public deliveryBoy?: UserDTO;
    public restaurant?: RestaurantDTO;
    public articles?: ArticleDTO[];
    public state?: string;
    public address?: string;
    public date?: Date;

    constructor(order: any) {
        if (order) {
            this.id = order._id;
            this.state = order.state;
            this.address = order.address;
            this.date = order.date;
            this.deliveryBoy = new UserDTO(order.delivery_boy);
            this.customer = new UserDTO(order.customer);
            this.restaurant = new RestaurantDTO(order.restaurant);
            this.articles = order.articles
                .map((a: any) => new ArticleDTO(a))
                .concat(
                    order.menus.map((a: any) => new ArticleDTO(a))
                );
        }
    }
}

export namespace OrderRepository {

    export function create(newOrder: OrderDTO) {
        const newMenus = newOrder?.articles?.filter((a) => a.subArticles && a.subArticles.length);
        const newArticles = newOrder?.articles?.filter((a) => !a.subArticles || !a.subArticles.length);

        const order = new Order({
            state: 'restaurant.pending',
            address: newOrder.address,
            date: newOrder.date,
            customer: new User({
                id: newOrder.customer?.id,
                first_name: newOrder.customer?.firstName,
                last_name: newOrder.customer?.lastName
            })
        });

        return Restaurant.findById(newOrder.restaurant?.id)
            .then((restaurant: any) => {
                order.restaurant = restaurant;
                return Article.find({ '_id': { $in: newArticles?.map(a => a.id) } });
            })
            .then((articles: any) => {
                order.articles = articles;
                return Menu.find({ '_id': { $in: newMenus?.map(a => a.id) } });
            })
            .then((menus: any) => {
                order.menus = menus;
                return order.save();
            })
            .then((order: any) => {
                return Promise.resolve(new OrderDTO(order));
            });
    }

    export function getAll() {
        return Order.find().then((orders: any) => {
            return Promise.resolve(orders.map((o: any) => new OrderDTO(o)));
        });
    }

    export function getFromUser(userId: number) {
        return Order.find({
            'customer.id': userId
        })
        .then((orders: any) => {
            return Promise.resolve(orders.map((o: any) => new OrderDTO(o)));
        });
    }

    export function getFromRestaurant(restaurantId: string)
    {
        return Order.find({
            'restaurant._id': restaurantId
        })
        .then((orders: any) => {
            return Promise.resolve(orders.map((o: any) => new OrderDTO(o)));
        });
    }

    export function updateOrderState(orderId: string, state: string)
    {
        return Order.findById(orderId)
        .then((order: any) => {
            if (order) {
                order.state = state;
                return order.save();
            }
            return Promise.reject("Order not found");
        }).then((order: any) => {
            return Promise.resolve(new OrderDTO(order));
        })
    }

    export function updateOrderDelivery(orderId: string, state: string, deliveryBoy: UserDTO)
    {
        return Order.findById(orderId)
        .then((order: any) => {
            if (order) {
                order.state = state;
                order.delivery_boy = new User({
                    id: deliveryBoy.id,
                    first_name: deliveryBoy.firstName,
                    last_name: deliveryBoy.lastName
                });
                return order.save();
            }
            return Promise.reject("Order not found");
        }).then((order: any) => {
            return Promise.resolve(new OrderDTO(order));
        })
    }

    export function getAvailableDelivery()
    {
        return Order.find({state: 'restaurant.finished'}).then((orders: any) => {
            return Promise.resolve(orders.map((o: any) => new OrderDTO(o)));
        });
    }

    export function getOrderFromDeliveryBoy(deliveryBoyId: number)
    {
        return Order.findOne({'delivery_boy.id': deliveryBoyId, state: 'delivery.progress'}).then((order: any) => {
            if (order)
            {
                return Promise.resolve(new OrderDTO(order));
            }
            return Promise.reject("No delivery.");
        });
    }
}

