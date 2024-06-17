import { Router } from "express";
import { articleRouter } from "./articleRouter.js";
import userRouter from "./userRouter.js";
import { commentRouter } from "./commentRouter.js";
import { tagRouter } from "./tagRouter.js";
import { likeRouter } from "./likeRouter.js";

const router = Router();

router.use("/articles", articleRouter);
router.use("/users", userRouter);
router.use("/comments", commentRouter);
router.use("/tags", tagRouter);
router.use("/likes", likeRouter);

export default router;
