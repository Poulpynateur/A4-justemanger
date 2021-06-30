import { ArticleDTO, ArticleRepository } from "../models/article";

function create(restaurantId: string, newArticle: ArticleDTO)
{
    return ArticleRepository.create(restaurantId, newArticle);
}

function updateArticle(restaurantId: string, newArticle: ArticleDTO)
{
    return ArticleRepository.updateArticle(restaurantId, newArticle);
}

function removeArticle(restaurantId: string, articleId: string)
{
    return ArticleRepository.removeArticle(restaurantId, articleId);
}

function updateMenu(restaurantId: string, newArticle: ArticleDTO)
{
    return ArticleRepository.updateMenu(restaurantId, newArticle);
}

function removeMenu(restaurantId: string, articleId: string)
{
    return ArticleRepository.removeMenu(restaurantId, articleId);
}

export default {
    create,
    updateArticle,
    removeArticle,
    updateMenu,
    removeMenu
}