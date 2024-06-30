import { Router } from "express";
import { refreshToken } from "../controller/authController.js";

const authRouter = Router();
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
