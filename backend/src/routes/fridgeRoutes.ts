import { Router } from "express";
import { addIngredientToFridge, getFridge, removeIngredientFromFridge } from "../controllers/fridgeController";

const router = Router();

router.post("/ingredient/add", addIngredientToFridge);
router.get("/ingredients", getFridge);
router.delete("/ingredient/remove/:id", removeIngredientFromFridge)

export default router;
