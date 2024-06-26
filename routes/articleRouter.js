import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../controller/articleController.js";
import auth from "../middlewares/auth.js";

export const articleRouter = Router();

articleRouter.get("/", getArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", auth.verifyToken, createArticle);
articleRouter.put("/:id", auth.verifyToken, updateArticle);
articleRouter.delete("/:id", auth.verifyToken, deleteArticle);
