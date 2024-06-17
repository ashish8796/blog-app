import { Router } from "express";
import { deleteLikeById, newLike } from "../controller/likeController.js";
import auth from "../middlewares/auth.js";

export const likeRouter = Router();

likeRouter.post("/", auth.verifyToken, newLike);
likeRouter.delete("/:articleId/:likeId", auth.verifyToken, deleteLikeById);
