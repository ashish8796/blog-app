import { Router } from "express";
import { deleteTagById, getTags, newTag } from "../controller/tagController.js";
import auth from "../middlewares/auth.js";

export const tagRouter = Router();

tagRouter.get("/", getTags);
tagRouter.post("/", auth.verifyToken, newTag);
tagRouter.delete("/:id", auth.verifyToken, deleteTagById);
