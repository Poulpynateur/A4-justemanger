import { articleService } from "core/services/articleService";
import {Request, Response} from "express";

function readArticlesList(req: Request, res: Response) {
    res.status(200).json({message: articleService.listAll()});
}

function readArticlesFromRestaurant(req: Request, res: Response) {
    res.status(200).json({ message: articleService.listAllFromRestaurant(req.params.id)});
}

function createArticle(req: Request, res: Response) {
    res.status(200).json({ message: articleService.create(req.data.articleInfo)});
}

function readArticle(req: Request, res: Response) {
    res.status(200).json({ message: articleService.read(req.params.id)});
}

function updateArticle(req: Request, res: Response) {
    res.status(200).json({ message: articleService.update(req.params.id, req.data.updated)});
}

function deleteArticle(req: Request, res: Response) {
    res.status(200).json({ message: articleService.delete(req.params.id)});
}

//user interface
export default {
    listAll: readArticlesList,
    listAllFromRestaurant: readArticlesFromRestaurant,
    create: createArticle,
    read: readArticle,
    update: updateArticle,
    delete: deleteArticle
}
