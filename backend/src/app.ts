import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";
import { apiRouter } from "./routes";
import cors from "cors";
import { agentRouter } from "./routes/agentRoutes";
import { shoppingListRouter } from "./routes/shoppingListRoutes";

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/agent", agentRouter);
app.use("/shopping-list", shoppingListRouter);
app.use(apiRouter);
