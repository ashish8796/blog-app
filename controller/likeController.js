import { setResponseHeaders } from "../helper/headersHelper.js";
import Like from "../models/like.js";
import {
  addLikeOnArticle,
  deleteLikeFromArticle,
} from "./articleController.js";

export const newLike = async (req, res) => {
  const { body } = req;
  const { articleId } = body;

  try {
    const like = await new Like(body);
    const isLikedArticle = await addLikeOnArticle(res, articleId, like._id);

    if (isLikedArticle) {
      await like.save();
      res.status(201).end();
    }
  } catch (error) {
    console.log("Error creating new like:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteLikeById = async (req, res) => {
  const { articleId, likeId } = req.params;

  try {
    await Like.findByIdAndDelete(likeId);
    const isLikeDeleted = await deleteLikeFromArticle(res, articleId, likeId);

    if (isLikeDeleted) {
      res.status(204).end();
    }
  } catch (error) {
    console.log("Error deleting like:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
