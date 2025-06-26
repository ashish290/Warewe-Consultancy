import express from "express";
import dotenv from "dotenv";
import { mainRouter } from "./routes";
import { initORM } from "./db";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT!) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.frontend_URI!,
    credentials: true,
  })
);
app.use("/api", mainRouter);

initORM()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Express is running on :", PORT);
    });
  })
  .catch((error) => {
    console.log("ORM initialization error:", error);
  });