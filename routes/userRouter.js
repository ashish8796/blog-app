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
import {
  validateLoginUser,
  validateSignUpUser,
} from "../middlewares/validation/userMiddleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", validateSignUpUser, registerUser);
userRouter.put("/update/:id", auth.verifyToken, updateUserById);
userRouter.delete("/delete/:id", auth.verifyToken, deleteUserById);
userRouter.post("/login", validateLoginUser, login);

export default userRouter;
