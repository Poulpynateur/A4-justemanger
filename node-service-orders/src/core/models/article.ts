import mongoose from "mongoose";

/**** ORM ****/
export const articleSchema = new mongoose.Schema({
    restaurantId: mongoose.Types.ObjectId,
    name: String,
    price: String
})
export const Article = mongoose.model('Article', articleSchema);
export const menuSchema = new mongoose.Schema({
    restaurantId: mongoose.Types.ObjectId,
    name: String,
    price: String,
    subArticles: [articleSchema]
})
export const Menu = mongoose.model('Menu', menuSchema);

/**** DTO ****/
export class ArticleDTO {
    public id?: string;
    public price?: number;
    public name?: string;
    public subArticles?: ArticleDTO[];

    constructor(article?: any) {
        if (article) {
            this.id = article._id;
            this.name = article.name;
            this.price = article.price;
        }
    }
}

/**** Repository ****/
export namespace ArticlesRepository {
}