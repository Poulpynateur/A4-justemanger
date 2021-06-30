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

export namespace ArticleRepository {

    export function create(restaurantId: string, newArticle: ArticleDTO) {
        if (newArticle.subArticles && newArticle.subArticles.length) {
            const menu = new Menu({
                restaurantId: restaurantId,
                name: newArticle.name,
                price: newArticle.price
            });

            return new Promise((resolve, reject) => {
                Article.find({ '_id': { $in: newArticle.subArticles } })
                .then((articles: any) => {
                    menu.subArticles = articles;
                    return menu.save().then((menu: any) => {
                        const menuDTO = new ArticleDTO(menu);
                        menuDTO.subArticles = menu.subArticles.map((article: any) => new ArticleDTO(article));
                        resolve(menuDTO);
                    });
                })
                .catch((error: Error) => {
                    reject(error);
                });
            });
        }
        else {
            const article = new Article({
                restaurantId: restaurantId,
                name: newArticle.name,
                price: newArticle.price
            });

            return new Promise((resolve, reject) => {
                article.save()
                .then((article: any) => {
                    return Promise.resolve(new ArticleDTO(article));
                })
                .catch((error: Error) => {
                    reject(error);
                });
            });
        }
    }

    export function updateArticle(restaurantId: string, newArticle: ArticleDTO) {
        return Article.findOne({ _id: newArticle.id, restaurantId: restaurantId })
            .then((article: any) => {
                if (article) {

                    article.name = newArticle.name;
                    article.price = newArticle.price;
                    
                    return article.save();
                }
                return Promise.reject(new Error("Article not found"));
            }).then((article: any) => {
                return Promise.resolve(new ArticleDTO(article));
            });
    }

    export function updateMenu(restaurantId: string, newArticle: ArticleDTO) {
        return Menu.findOne({ _id: newArticle.id, restaurantId: restaurantId })
            .then((menu: any) => {
                if (menu) {

                    menu.name = newArticle.name;
                    menu.price = newArticle.price;

                    return Article.find({ '_id': { $in: newArticle.subArticles?.map(a => a.id) } })
                        .then((articles: any) => {
                            menu.subArticles = articles;
                            return menu.save();
                        });
                }
                return Promise.reject(new Error("Menu not found"));
            }).then((menu: any) => {
                const menuDTO = new ArticleDTO(menu);
                menuDTO.subArticles = menu.subArticles.map((article: any) => new ArticleDTO(article));
                return Promise.resolve(menuDTO);
            });
    }

    export function removeArticle(restaurantId: string, articleId: string) {
        return Article.findByIdAndDelete(articleId);
    }

    export function removeMenu(restaurantId: string, articleId: string) {
        return Menu.findByIdAndDelete(articleId);
    }
}