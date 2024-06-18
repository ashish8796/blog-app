import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import Comment from "../models/comment.js";

export async function getCommentsByArticleId(req, res) {
  handleRequest(req, res, async (req) => {
    const { articleId } = req.params;
    return await Comment.find({ articleId }).lean();
  });
}

export async function newComment(req, res) {
  handleRequestWithoutBody(req, res, async (req) => {
    const { body } = req;

    return await Comment.create(body);
  });
}

export async function deleteCommentById(req, res) {
  handleRequestWithoutBody(req, res, async (req) => {
    const { commentId } = req.params;
    return await Comment.findByIdAndDelete(commentId);
  });
}
