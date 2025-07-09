import { Router } from "express";
import { userMiddleware } from "../../middleware/auth.middleware.js";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "./Services/User.services.js";

const userRouter = Router();

userRouter.get("/:id", userMiddleware("admin", "user"), getUser);
userRouter.get("/", userMiddleware("admin"), getAllUser);
userRouter.patch("/:id", userMiddleware("user"), updateUser);
userRouter.delete("/:id", userMiddleware("user", "admin"), deleteUser);

export default userRouter;
