import mongoose, { Schema } from "mongoose";
import Article from "./article.js";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    articleId: { type: Schema.Types.ObjectId, ref: "Article", required: true },
  },
  { timestamps: true }
);

// hooks | middleware
commentSchema.pre("findOneAndDelete", onDeleteComment);
commentSchema.pre("save", onSaveNewComment);

const Comment = mongoose.model("Comment", commentSchema);

async function onDeleteComment(next) {
  try {
    await Article.findByIdAndUpdate(this.articleId, {
      $pull: { comments: this._id },
    });
  } catch (error) {
    throw error;
  } finally {
    next();
  }
}

async function onSaveNewComment(next) {
  try {
    await Article.findByIdAndUpdate(this.articleId, {
      $push: { comments: this._id },
    });
  } catch (error) {
    throw error;
  } finally {
    next();
  }
}

export default Comment;
