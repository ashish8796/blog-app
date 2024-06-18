import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import Tag from "../models/tag.js";

export const getTags = async (req, res) => {
  handleRequest(req, res, async () => {
    return await Tag.find({}).lean();
  });
};

export const newTag = async (req, res) => {
  handleRequest(req, res, async (req) => {
    const { body } = req;
    return await Tag.create(body);
  });
};

export const deleteTagById = async (req, res) => {
  handleRequestWithoutBody(req, res, async (req) => {
    const { id } = req.params;
    return Tag.findByIdAndDelete(id);
  });
};
