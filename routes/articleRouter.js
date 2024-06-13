import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../controller/articleController.js";

export const articleRouter = Router();

articleRouter.get("/", getArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);
