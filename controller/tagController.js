import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import { prisma } from "../server.config.js";

export const getTags = async (req, res) => {
  handleRequest(req, res, async () => {
    return await prisma.tag.findMany();
  });
};

export const newTag = async (req, res) => {
  handleRequest(req, res, async (req) => {
    const { body } = req;
    return await prisma.tag.create({ data: body });
  });
};

export const deleteTagById = async (req, res) => {
  handleRequestWithoutBody(req, res, async (req) => {
    const { id } = req.params;
    return prisma.tag.delete({ where: { id } });
  });
};
