import dotenv from "dotenv";

// Set the path to the appropriate environment file
const envPath = `./.env.${process.env.NODE_ENV}`;

// Load environment variables
dotenv.config({ path: envPath });

export const port = process.env.PORT;
export const dbUsername = process.env.DB_USERNAME;
export const dbPassword = process.env.DB_PASSWORD;
export const jwtSecret = process.env.JWT_SECRET;
export const hostname = process.env.HOSTNAME;
