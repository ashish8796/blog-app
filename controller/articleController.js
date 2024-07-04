import { testArticleId } from "../config/app.config.js";
import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import Article from "../models/article.js";

export async function getArticles(req, res) {
  handleRequest(req, res, async () => {
    return await Article.find({}).lean(true);
  });
}

export async function getArticleById(req, res) {
  handleRequest(req, res, async (req) => {
    const { id } = req.params;
    return await Article.findById(id)
      .lean()
      .populate("comments")
      .populate("likes")
      .exec();
  });
}

export async function createArticle(req, res) {
  try {
    const { body, user } = req;

    if (body.author == user.userId) {
      const article = await Article.create(body);
      res.status(201).json(article);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateArticle(req, res) {
  handleRequest(req, res, async (req) => {
    const { body } = req;
    const { id } = req.params;
    return await Article.findByIdAndUpdate(id, body, {
      new: true,
    });
  });
}

export async function deleteArticle(req, res) {
  try {
    const { id } = req.params;
    if (id === testArticleId) {
      return res
        .status(200)
        .json({ message: "Test article can't not be deleted." });
    }

    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    res.status(200).json({ message: "Article deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
