import mongoose from "mongoose";

/**** ODM ****/
export const articleSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    type: String, // menu/plat/boisson/dessert
    restaurant: Number
})

export const Article = mongoose.model('Article', articleSchema);

export namespace articlesRepository {

    export function selectAll() {
        let errorMessage = ''
        try {
            Article.find()
            .then((doc: any)=> { 
                if (doc) {
                    return doc;
                } else {
                    errorMessage = "No article was found...";
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

    export function selectAllFromRestaurant(id: number) {
        let errorMessage = ''
        try {
            Article.find().where('restaurant').equals(id)
            .then((doc: any)=> { 
                if (doc) {
                    return doc;
                } else {
                    errorMessage = "No article was found...";
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

    export function insertArticle(articleInfo: typeof Article) {
        try {
            var restaurant = new Article(articleInfo)
            restaurant.save()
            .then((err: Error, data: any) => {
                if (err) {
                    console.log(err)
                    return err
                }
                else {
                    return "Successfully inserted article."; // or a promise ?
                }
            })
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    export function selectArticle(id: number) {
        var errorMessage = '';
        if (mongoose.Types.ObjectId.isValid(id)) {
            Article.findById(id)
            .then((doc: typeof Article)=> { 
                if (doc) {
                    return doc;
                } else {
                    errorMessage = "There is no article found with the following id: " + id.toString()
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

    export function updateArticle(id: number, updatedArticle: typeof Article) {
        var errorMessage = '';
        if (mongoose.Types.ObjectId.isValid(id)){
            Article.findByIdAndUpdate(id, updatedArticle)
            .then((error: Error, data: any) => {
                if (error) {
                    console.log(error);
                    return error
                } else {
                    console.log(data, "\nSuccessfully updated article info: " + id.toString());
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

    export function deleteArticle(id: number) {
        var errorMessage = '';
        if (mongoose.Types.ObjectId.isValid(id)){
            Article.findByIdAndRemove(id)
            .then((error: Error, data: any) => {
                if (error) {
                    console.log(error);
                    return error
                } else {
                    console.log(data, "\nSuccessfully removed article: " + id.toString())
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