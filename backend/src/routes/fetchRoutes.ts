import { Router } from "express";
import { getRecipes } from "../controllers/fetchController";

const router = Router();

router.get("/", getRecipes )

export default router;