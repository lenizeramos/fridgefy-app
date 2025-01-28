import { Router } from "express";
import registerRoutes from "./userRoutes";
import errorRoutes from "./errorRoutes";
import fetchRoutes from "./fetchRoutes";
import fridgeRoutes from "./fridgeRoutes";

export const apiRouter = Router();

const ROUTER = [
  { url: "/register", router: registerRoutes },
  { url: "/fetch", router: fetchRoutes },
  { url: "/fridge", router: fridgeRoutes },
];

ROUTER.forEach(({ url, router }) => {
  apiRouter.use(url, router);
});

apiRouter.all("*", errorRoutes);
