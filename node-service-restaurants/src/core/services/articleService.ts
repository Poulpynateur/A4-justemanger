import { Article, ArticleRepository } from "../models/article";

export const articleService = { 
    listAll: listAll,
    listAllFromRestaurant: listAllFromRestaurant,
    create: createArticle,
    read: readArticle,
    update: updateArticle,
    delete: deleteArticle
}

export function listAll() {
    return ArticleRepository.selectAll();
}

export function listAllFromRestaurant(id: number) {
    return ArticleRepository.selectAllFromRestaurant(id)
}

function createArticle(articleInfo: typeof Article) {
    return ArticleRepository.insertArticle(articleInfo);
}

function readArticle(id: number) {
    return ArticleRepository.selectArticle(id);
}

function updateArticle(id: number, updatedArticle: typeof Article) {
    return ArticleRepository.updateArticle(id, updatedArticle);
}

function deleteArticle(id: number) {
    return ArticleRepository.deleteArticle(id);
}

export default {
    articleService
}