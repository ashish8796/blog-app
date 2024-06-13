import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      minLength: 3,
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

export default mongoose.model("Comment", commentSchema);
