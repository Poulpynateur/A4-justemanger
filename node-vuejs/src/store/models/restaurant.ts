export class RestaurantDTO {
    public id?: string;
    public name?: string;
    public address?: string;
    public articles?: ArticleDTO[];
    public menus?: ArticleDTO[]; // articles with subArticles

    public toString() {
        if (this.address) return this.name + ' - ' + this.address;
        return this.name;
    }
}

export class ArticleDTO {
    public id?: string;
    public price?: number;
    public name?: string;

    public subArticles?: ArticleDTO[] = [];

    public toString() {
        return this.name;
    }
}