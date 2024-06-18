import {
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import Like from "../models/like.js";

export const newLike = async (req, res) => {
  handleRequestWithoutBody(req, res, async (req) => {
    const { body } = req;
    return await Like.create(body);
  });
};

export const deleteLikeById = async (req, res) => {
  handleRequestWithoutBody(req, res, async (req) => {
    const { likeId } = req.params;
    return await Like.findByIdAndDelete(likeId);
  });
};
