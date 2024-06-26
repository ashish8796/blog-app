import { Router } from "express";
import {
  deleteLikeById,
  getAllLikes,
  newLike,
} from "../controller/likeController.js";
import auth from "../middlewares/auth.js";

export const likeRouter = Router();

likeRouter.get("/", getAllLikes);

likeRouter.post("/", auth.verifyToken, newLike);
likeRouter.delete("/:likeId", auth.verifyToken, deleteLikeById);
