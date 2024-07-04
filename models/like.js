import mongoose, { Schema } from "mongoose";
import Article from "./article.js";

const likeSchema = new Schema(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },

    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// middleware
likeSchema.pre("save", onCreateNewLike);
likeSchema.pre("findOneAndDelete", onUnlike);

const Like = mongoose.model("Like", likeSchema);

async function onCreateNewLike(next) {
  try {
    await Article.findByIdAndUpdate(this.articleId, {
      $push: {
        likes: this._id,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    next();
  }
}

async function onUnlike(next) {
  try {
    await Article.findByIdAndUpdate(this.articleId, {
      $pull: {
        likes: this._id,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    next();
  }
}

export default Like;
