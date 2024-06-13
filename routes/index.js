import { Router } from "express";
import { articleRouter } from "./articleRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/articles", articleRouter);
router.use("/users", userRouter);

router.get("/", (req, res) => {
  res.send("Welcome to my API");
});

export default router;
