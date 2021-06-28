import { ArticleDTO, RestaurantDTO } from "./restaurant";
import { UserDTO } from "./user";

//@ts-nocheck
Date.prototype.toString = function () {
    return Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long' }).format(this);
}

export class OrderDTO {
    public id?: string;
    public customer: UserDTO;
    public restaurant?: RestaurantDTO;
    public articles?: ArticleDTO[];
    public state?: string;
    public address?: string;
    public date?: Date;
}