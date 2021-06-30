import mongoose from "mongoose";

/**** ODM ****/
export const articleSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    type: String, // menu/plat/boisson/dessert
    restaurant: Number
})

export const Article = mongoose.model('Article', articleSchema);

/**** DTO ****/
export class ArticleDTO {
    public id?: number;
    public restaurantId?: number;
    public imagePath?: string;
    public price?: number;
    public type?: string;

    constructor(article?: any) {
        if (article) {
            // Convert database model to DTO
            this.id = article._id;
            this.restaurantId = article.restaurant;
            this.imagePath = article.image;
            this.price = article.price;
            this.type = article.type;
        }
    }
}
export namespace articlesRepository {

    export function selectAll() {
        let errorMessage = ''
        try {
            Article.find()
            .then((doc: any)=> { 
                if (doc) {
                    return Promise.resolve(doc);
                } else {
                    errorMessage = "No article was found...";
                    console.log(errorMessage);
                    return Promise.reject(new Error(errorMessage));
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

    export function selectAllFromRestaurant(id: number) {
        Article.find().where('restaurant').equals(id)
        .then((doc: any) => { 
            if (doc) {
                return Promise.resolve(doc);
            } else {
                let errorMessage = "No article was found...";
                console.log(errorMessage);
                return Promise.reject(new Error(errorMessage));
            }
        })
        .catch((err: Error)=> {
            console.log(err);
            return Promise.reject(err);
        });
    }

    export function insertArticle(articleInfo: typeof Article) {
        var restaurant = new Article(articleInfo)
        return new Promise((resolve, reject) => {
            restaurant.save()
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
                console.log(error);
                reject(error)
            })
        })
    }

    export function selectArticle(id: number) {
        var errorMessage = '';
        return new Promise((resolve, reject) => {
            if (mongoose.Types.ObjectId.isValid(id)) {
                Article.findById(id)
                .then((doc: typeof Article)=> { 
                    if (doc) {
                        resolve(doc);
                    } else {
                        errorMessage = "There is no article found with the following id: " + id.toString();
                        console.log(errorMessage);
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

    export function updateArticle(id: number, updatedArticle: typeof Article) {
        return new Promise((resolve, reject) => {
            if (mongoose.Types.ObjectId.isValid(id)){
                Article.findByIdAndUpdate(id, updatedArticle)
                .then((error: Error, data: any) => {
                    if (error) {
                        console.log(error);
                        reject(error)
                    } else {
                        console.log(data, "\nSuccessfully updated article info: " + id.toString());
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

    export function deleteArticle(id: number) {
        return new Promise((resolve, reject) => {
            if (mongoose.Types.ObjectId.isValid(id)){
                Article.findByIdAndRemove(id)
                .then((error: Error, data: any) => {
                    if (error) {
                        console.log(error);
                        reject(error)
                    } else {
                        console.log(data, "\nSuccessfully removed article: " + id.toString())
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