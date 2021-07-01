import {Request, Response} from "express";

import articleService from "../../core/services/articleService";
import {ArticleDTO} from "../../core/models/article";

function create(req: Request, res: Response)
{
    articleService.create(req.params.restaurantId, req.body as ArticleDTO)
    .then((article: ArticleDTO) => {
        res.status(200).json(article);
    }).catch((error: any) => {
        res.status(400).json({"message": error.toString()});
    });
}

function updateArticle(req: Request, res: Response)
{
    articleService.updateArticle(req.params.restaurantId, req.body as ArticleDTO)
    .then((article: ArticleDTO) => {
        res.status(200).json(article);
    }).catch((error: any) => {
        res.status(400).json({"message": error.toString()});
    });
}

function removeArticle(req: Request, res: Response)
{
    articleService.removeArticle(req.params.restaurantId, req.params.articleId)
    .then(() => {
        res.status(200).json({"message": "Success."});
    }).catch((error: any) => {
        res.status(400).json({"message": error.toString()});
    });
}

function updateMenu(req: Request, res: Response)
{
    articleService.updateMenu(req.params.restaurantId, req.body as ArticleDTO)
    .then((article: ArticleDTO) => {
        res.status(200).json(article);
    }).catch((error: any) => {
        res.status(400).json({"message": error.toString()});
    });
}

function removeMenu(req: Request, res: Response)
{
    articleService.removeMenu(req.params.restaurantId, req.params.articleId)
    .then(() => {
        res.status(200).json({"message": "Success."});
    }).catch((error: any) => {
        res.status(400).json({"message": error.toString()});
    });
}

export default {
    create,
    updateArticle,
    removeArticle,
    updateMenu,
    removeMenu,
}
