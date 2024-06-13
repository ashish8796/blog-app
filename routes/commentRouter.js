import { Router } from "express";
import {
  deleteCommentById,
  getCommentsByArticleId,
  newComment,
} from "../controller/commetController.js";

export const commentRouter = Router();

commentRouter.get("/:articleId", getCommentsByArticleId);
commentRouter.post("/", newComment);
commentRouter.delete("/:articleId/:commentId", deleteCommentById);
