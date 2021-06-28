export class RestaurantDTO {
    public id?: string;
    public name?: string;
    public articles?: ArticleDTO[];
    public menus?: ArticleDTO[]; // articles with subArticles
}

export class ArticleDTO {
    public id?: string;
    public price?: number;
    public name?: string;

    public subArticles?: ArticleDTO[];

    public toString() {
        return this.name;
    }
}