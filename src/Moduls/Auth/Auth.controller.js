///routes
import { Router } from "express";
import { login, register, logout } from "./Services/Auth.services.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
