import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Like", likeSchema);
