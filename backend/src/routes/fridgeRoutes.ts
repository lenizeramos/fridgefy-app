import { Router } from "express";
import { addIngredientToFridge } from "../controllers/fridgeController";

const router = Router();

router.post("/", addIngredientToFridge);

export default router;
