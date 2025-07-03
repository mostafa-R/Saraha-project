import cors from "cors";
import dontenv from "dotenv";
import express from "express";
import connection from "./DB/connection.js";
import authRouter from "./Moduls/Auth/Auth.controller.js";

dontenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter)

export const Bootstrap = () => {
  connection();
  app
    .listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
    .on("error", (error) => console.log("Server error", error));
};
