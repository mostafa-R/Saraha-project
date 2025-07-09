import cors from "cors";
import dontenv from "dotenv";
import express from "express";
import connection from "./DB/connection.js";
import authRouter from "./Moduls/Auth/Auth.controller.js";
import userRouter from "./Moduls/User/User.controller.js";
import { authToken } from "./middleware/auth.middleware.js";
import cookieParser from "cookie-parser";

dontenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRouter);
app.use(authToken);
app.use("/user", userRouter);

export const Bootstrap = () => {
  connection();
  app
    .listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
    .on("error", (error) => console.log("Server error", error));
};
