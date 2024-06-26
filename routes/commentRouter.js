import { Router } from "express";
import {
  deleteCommentById,
  getAllComments,
  getCommentsByArticleId,
  newComment,
} from "../controller/commetController.js";
import auth from "../middlewares/auth.js";

export const commentRouter = Router();

commentRouter.get("/", getAllComments);
commentRouter.get("/:articleId", getCommentsByArticleId);
commentRouter.post("/", auth.verifyToken, newComment);
commentRouter.delete("/:commentId", auth.verifyToken, deleteCommentById);
