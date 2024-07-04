import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Article from "./article.js";
import Comment from "./comment.js";
import Like from "./like.js";
import { jwtSecret } from "../config/app.config.js";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true },
    refreshToken: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

// hooks
userSchema.pre("save", hashPassword);
userSchema.pre("findOneAndDelete", onDeleteUser);

// user related methods
userSchema.methods.verifyPassword = verifyPassword;
userSchema.methods.generateToken = generateToken;

const User = mongoose.model("User", userSchema);

async function hashPassword(next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
}

async function verifyPassword(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log("Error in verifying password: ", error);
    throw error;
  }
}

async function generateToken() {
  try {
    const payload = { email: this.email, userId: this._id, role: this.role };
    return await jwt.sign(payload, jwtSecret, { expiresIn: "2 mins" });
  } catch (error) {
    console.log("Error generating token: ", error);
    throw error;
  }
}

async function onDeleteUser(next) {
  try {
    await Article.deleteMany({ author: this._id });
    await Comment.deleteMany({ author: this._id });
    await Like.deleteMany({ authorId: this._id });
  } catch (error) {
    console.log("Error deleting referenced documents on user: ", error);
    throw error;
  } finally {
    next();
  }
}

export default User;
