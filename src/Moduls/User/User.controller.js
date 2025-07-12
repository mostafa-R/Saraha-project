import { Router } from "express";
import { userMiddleware } from "../../middleware/auth.middleware.js";
import {
  deleteAllUsers,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "./Services/User.services.js";

const userRouter = Router();

userRouter.get("/getAllUsers", userMiddleware("admin"), getAllUser);
userRouter.get("/", userMiddleware("admin", "user"), getUser);
userRouter.patch("/editUser", userMiddleware("user"), updateUser);
userRouter.delete("/deleteUser", userMiddleware("user", "admin"), deleteUser);
userRouter.delete("/deleteAllUsers", userMiddleware("admin"), deleteAllUsers);
export default userRouter;
