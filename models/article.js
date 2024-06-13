import mongoose, { Schema } from "mongoose";

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

export default mongoose.model("Article", articleSchema);
