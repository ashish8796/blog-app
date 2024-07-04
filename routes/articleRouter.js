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
articleRouter.post("/new", auth.verifyToken, createArticle);
articleRouter.put("/update/:id", auth.verifyToken, updateArticle);
articleRouter.delete("/delete/:id", auth.verifyToken, deleteArticle);
