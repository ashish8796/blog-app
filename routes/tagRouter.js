import { Router } from "express";
import { deleteTagById, getTags, newTag } from "../controller/tagController.js";

export const tagRouter = Router();

tagRouter.get("/", getTags);
tagRouter.post("/", newTag);
tagRouter.delete("/:id", deleteTagById);
