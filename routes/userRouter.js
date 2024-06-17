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

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", registerUser);
userRouter.put("/:id", auth.verifyToken, updateUserById);
userRouter.delete("/:id", auth.verifyToken, deleteUserById);
userRouter.post("/login", login);

export default userRouter;
