import express from "express";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";
import { apiRouter } from "./routes";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.use(apiRouter);