import mongoose from "mongoose";
import { dbPassword, dbUsername } from "./server.config.js";

export default async function connectToDb() {
  try {
    console.log("Connecting to database.");
    await mongoose.connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@blog-app.vc0zjkd.mongodb.net/blog-app`
    );
    console.log("Connected to database.");
  } catch (err) {
    console.log(err);
  }
}
