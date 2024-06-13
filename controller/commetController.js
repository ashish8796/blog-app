import { setResponseHeaders } from "../helper/headersHelper.js";
import Comment from "../models/comment.js";
import {
  addCommentOnArticle,
  deleteCommentOnArticle,
} from "./articleController.js";

export async function getCommentsByArticleId(req, res) {
  setResponseHeaders(res);
  const { articleId } = req.params;

  try {
    const comments = Comment.find({ articleId }).lean();
    res.status(200).json(comments);
  } catch (error) {
    console.log("Error fetching comments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/*
1. Will create a new comment document
2. Update comments array in the related article
*/

export async function newComment(req, res) {
  const { body } = req;
  const { articleId } = body;
  try {
    const newComment = new Comment(body);

    const isArticleUpdated = await addCommentOnArticle(
      res,
      articleId,
      newComment
    );

    if (isArticleUpdated) {
      await newComment.save();
      res.status(201).end();
    }
  } catch (error) {
    console.log("Error adding comment to article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteCommentById(req, res) {
  const { articleId, commentId } = req.params;

  try {
    await Comment.findByIdAndDelete(commentId);
    const isCommentDeleted = await deleteCommentOnArticle(
      res,
      articleId,
      commentId
    );

    if (isCommentDeleted) {
      res.status(204).end();
    }
  } catch (error) {
    console.log("Error deleting comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// TODO: Add cascading for deleting user in comments
// TODO: Add cascading for deleting article in comments

// export async function deleteCommentsByAuthorId(req, res) {
//   const { authorId } = req.params;

//   try {
//     const comments = await Comment.deleteMany({ author: authorId });
//     const isCommentDeleted = await deleteCommentOnArticle(
//       res,
//       articleId,
//       commentId
//     );

//     if (isCommentDeleted) {
//       res.status(204).end();
//     }
//   } catch (error) {
//     console.log("Error deleting comment:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }
