import mongoose, { Schema } from "mongoose";
import Comment from "./comment.js";
import Like from "./like.js";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

articleSchema.pre("findOneAndDelete", onDeleteArticle);

const Article = mongoose.model("Article", articleSchema);

async function onDeleteArticle(next) {
  try {
    await Comment.deleteMany({ articleId: this._id });
    await Like.deleteMany({ articleId: this._id });
  } catch (error) {
    console.log("Error deleting referenced documents on article: ", error);
    throw error;
  } finally {
    next();
  }
}

export default Article;
