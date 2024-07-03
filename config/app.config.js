import dotenv from "dotenv";
// Load environment variables
dotenv.config();

export const testUserId = process.env.TEST_USER_ID;
export const testUserToken = process.env.TEST_USER_TOKEN;
export const testUserRefreshToken = process.env.TEST_USER_REFRESH_TOKEN;
