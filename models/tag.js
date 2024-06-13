import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
  {
    tag: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tag", tagSchema);
