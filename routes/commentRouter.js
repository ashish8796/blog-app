import { Router } from "express";
import {
  deleteCommentById,
  getCommentsByArticleId,
  newComment,
} from "../controller/commetController.js";
import auth from "../middlewares/auth.js";

export const commentRouter = Router();

commentRouter.get("/:articleId", getCommentsByArticleId);
commentRouter.post("/new", auth.verifyToken, newComment);
commentRouter.delete(
  "/delete/:commentId",
  auth.verifyToken,
  deleteCommentById
);
