import dotenv from "dotenv";
// Load environment variables
dotenv.config();

import mongoose from "mongoose";

export const dbUsername = process.env.DB_USERNAME;
export const dbPassword = process.env.DB_PASSWORD;

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
