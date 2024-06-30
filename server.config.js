import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const port = process.env.PORT;
export const jwtSecret = process.env.JWT_SECRET;
export const pgHost = process.env.PGHOST;
export const pgDatabase = process.env.PGDATABASE;
export const pgUser = process.env.PGUSER;
export const pgPassword = process.env.PGPASSWORD;
export const endpointId = process.env.ENDPOINT_ID;
