import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import { prisma } from "../server.config.js";

export async function getArticles(req, res) {
  handleRequest(req, res, async () => {
    return await prisma.article.findMany({
      include: {
        likes: true
      }
    });
  });
}

export async function getArticleById(req, res) {
  handleRequest(req, res, async (req) => {
    const { id } = req.params;
    return await prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            author: true,
          },
        },
        likes: true,
        tags: true,
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
    const { likes, comments, tags, ...rest } = body;
    const updateData = { ...rest };

    if (comments && comments.length > 0) {
      updateData.comments = {
        connect: comments.map((commentId) => ({ id: commentId })),
      };
    }

    if (likes && likes.length > 0) {
      updateData.likes = {
        connect: likes.map((commentId) => ({ id: commentId })),
      };
    }

    if (tags && tags.length > 0) {
      updateData.tags = {
        connect: tags.map((commentId) => ({ id: commentId })),
      };
    }

    return await prisma.article.update({
      where: {
        id,
      },
      data: updateData,
      include: {
        comments: true,
        likes: true,
        tags: true,
      },
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
