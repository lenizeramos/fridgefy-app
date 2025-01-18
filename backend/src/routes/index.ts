import { Router } from "express";
import registerRoutes from "./userRoutes";
import errorRoutes from "./errorRoutes";

export const apiRouter = Router();

const ROUTER = [{ url: "/register", router: registerRoutes }];

ROUTER.forEach(({ url, router }) => {
  apiRouter.use(url, router);
});

apiRouter.all("*", errorRoutes);
