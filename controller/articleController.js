import { setResponseHeaders } from "../helper/headersHelper.js";
import Article from "../models/article.js";

export async function getArticles(req, res) {
  setResponseHeaders(res);
  try {
    const articles = await Article.find({}).lean(true);
    res.status(200).json(articles);
  } catch (error) {
    console.log("Error fetching articles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getArticleById(req, res) {
  setResponseHeaders(res);
  const { id } = req.params;

  try {
    const article = await Article.findById(id)
      .populate("comments")
      .exec()
      .lean(true);

    if (article === null) {
      res.status(404).json({ message: "Article not found." });
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    console.log("Error fetching article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createArticle(req, res) {
  setResponseHeaders(res);
  const { body } = req;

  try {
    const article = await Article.create(body);
    console.log({ article });

    res.status(200).json(article);
  } catch (error) {
    console.log("Error creating article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateArticle(req, res) {
  setResponseHeaders(res);
  const { body } = req;
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndUpdate(id, body, {
      new: true,
    }).lean(true);

    if (article === null) {
      res.status(404).json({ message: "Article not found." });
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    console.log("Error updating article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteArticle(req, res) {
  const { id } = req.params;
  try {
    await Article.findByIdAndDelete(id);
    res.status(204);
  } catch (error) {
    console.log("Error deleting article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
