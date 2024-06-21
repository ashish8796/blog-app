import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

export const port = process.env.PORT;
export const dbUsername = process.env.DB_USERNAME;
export const dbPassword = process.env.DB_PASSWORD;
export const jwtSecret = process.env.JWT_SECRET;
export const hostname = process.env.HOSTNAME;
