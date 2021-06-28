export class RestaurantDTO {
    public name?: string;
    public articles?: ArticleDTO[];
    public menus?: MenuDTO[];
}

export class ArticleDTO {
    public id?: string;
    public price?: number;
    public name?: string;

    public toString() {
        return this.name;
    }
}

export class MenuDTO {
    public id?: string;
    public price?: number;
    public name?: string;
    public articles?: ArticleDTO[];
}