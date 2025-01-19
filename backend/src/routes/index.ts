import { Router } from "express";
import registerRoutes from "./userRoutes";
import errorRoutes from "./errorRoutes";
import fetchRoutes from "./fetchRoutes";

export const apiRouter = Router();

const ROUTER = [
  { url: "/register", router: registerRoutes },
  { url: "/fetch", router: fetchRoutes },
];

ROUTER.forEach(({ url, router }) => {
  apiRouter.use(url, router);
});

apiRouter.all("*", errorRoutes);
