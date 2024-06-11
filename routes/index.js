import { Router } from "express";
import { articleRouter } from "./articles";

export const router = Router();

router.use("/articles", articleRouter);


router.get("/", (req, res) => {
  res.send("Welcome to my API");
});
