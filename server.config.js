import dotenv from "dotenv";
// Load environment variables
dotenv.config();
export const port = process.env.PORT;
export const dbUsername = process.env.DB_USERNAME;
export const dbPassword = process.env.DB_PASSWORD;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
export const hostname = process.env.HOSTNAME;
