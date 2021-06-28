import { ArticleDTO, RestaurantDTO } from "./restaurant";

export class OrderDTO {
    public id?: string;
    public restaurant?: RestaurantDTO;
    public articles?: ArticleDTO[];
    public state?: string;
}