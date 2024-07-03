import { Router } from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  login,
  registerUser,
  updateUserById,
} from "../controller/userController.js";
import auth from "../middlewares/auth.js";
import validateUserSchema from "../middlewares/validation/userMiddleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", validateUserSchema, registerUser);
userRouter.put("/:id", auth.verifyToken, updateUserById);
userRouter.delete("/:id", auth.verifyToken, deleteUserById);
userRouter.post("/login", validateUserSchema, login);

export default userRouter;
