import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import { prisma } from "../server.config.js";

export const getAllLikes = async (req, res) => {
  handleRequest(req, res, async () => {
    return await prisma.like.findMany();
  });
};

export const newLike = async (req, res) => {
  handleRequestWithoutBody(req, res, async (req) => {
    const { body } = req;
    return await prisma.like.create({ data: body });
  });
};

export const deleteLikeById = async (req, res) => {
  handleRequestWithoutBody(req, res, async (req) => {
    const { likeId } = req.params;
    return await prisma.like.delete({
      where: {
        id: likeId,
      },
    });
  });
};
