import { Router } from "express";
import { deleteLikeById, newLike } from "../controller/likeController.js";
import auth from "../middlewares/auth.js";

export const likeRouter = Router();

likeRouter.post("/new", auth.verifyToken, newLike);
likeRouter.delete("/:likeId", auth.verifyToken, deleteLikeById);
