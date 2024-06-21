import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the path to the appropriate environment file
const envPath = `./.env.${process.env.NODE_ENV}`;

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, envPath) });

export const port = process.env.PORT;
export const dbUsername = process.env.DB_USERNAME;
export const dbPassword = process.env.DB_PASSWORD;
export const jwtSecret = process.env.JWT_SECRET;
export const hostname = process.env.HOSTNAME;
