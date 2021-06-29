import mongoose from "mongoose";

/**** ORM ****/
export const articleSchema = new mongoose.Schema({
    name: String,
    price: String,
    subArticles: [mongoose.Types.ObjectId]
})

/**** ****/
export class ArticleDTO {
    public id?: string;
    public price?: number;
    public name?: string;
    public subArticles?: ArticleDTO[] = [];
}

export const Article = mongoose.model('Article', articleSchema);

export namespace ArticleRepository {

}