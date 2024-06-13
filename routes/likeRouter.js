import { Router } from "express";
import { deleteLikeById, newLike } from "../controller/likeController.js";

export const likeRouter = Router();

likeRouter.post("/", newLike);
likeRouter.delete("/:articleId/:likeId", deleteLikeById);
