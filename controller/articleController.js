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
    return await Article.findById(id).lean().populate("comments").exec();
  });
}

export async function createArticle(req, res) {
  handleRequest(req, res, async (req) => {
    const { body } = req;
    return await Article.create(body);
  });
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
  handleRequestWithoutBody(req, res, async (req) => {
    const { id } = req.params;
    return await Article.findByIdAndDelete(id);
  });
}
