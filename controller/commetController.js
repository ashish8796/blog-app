import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import { prisma } from "../server.config.js";

export async function getAllComments(req, res) {
  handleRequest(req, res, async () => {
    return await prisma.comment.findMany();
  });
}

export async function getCommentsByArticleId(req, res) {
  handleRequest(req, res, async (req) => {
    const { articleId } = req.params;
    return await prisma.comment.findMany({
      where: {
        articleId,
      },
    });
  });
}

export async function newComment(req, res) {
  handleRequestWithoutBody(req, res, async (req) => {
    const { body } = req;

    return await prisma.comment.create({ data: body });
  });
}

export async function deleteCommentById(req, res) {
  handleRequestWithoutBody(req, res, async (req) => {
    const { commentId } = req.params;
    return await prisma.comment.delete({ where: { id: commentId } });
  });
}
