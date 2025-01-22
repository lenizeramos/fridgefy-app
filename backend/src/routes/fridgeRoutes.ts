import { Router } from "express";
import { addIngredientToFridge, getFridge } from "../controllers/fridgeController";

const router = Router();

router.post("/ingredient/add", addIngredientToFridge);
router.get("/ingredients", getFridge)

export default router;
