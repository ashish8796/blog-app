import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
