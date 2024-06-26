import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import { prisma } from "../server.config.js";

export async function getArticles(req, res) {
  handleRequest(req, res, async () => {
    return await prisma.article.findMany();
  });
}

export async function getArticleById(req, res) {
  handleRequest(req, res, async (req) => {
    const { id } = req.params;
    return await prisma.article.findUnique({
      where: {
        id,
      },
    });
  });
}

export async function createArticle(req, res) {
  handleRequest(req, res, async (req) => {
    const { body } = req;
    return await prisma.article.create({ data: body });
  });
}

export async function updateArticle(req, res) {
  handleRequest(req, res, async (req) => {
    const { body } = req;
    const { id } = req.params;
    return await prisma.article.update({
      where: {
        id,
      },
      data: body,
    });
  });
}

export async function deleteArticle(req, res) {
  handleRequestWithoutBody(req, res, async (req) => {
    const { id } = req.params;
    return await prisma.article.delete({
      where: {
        id,
      },
    });
  });
}
