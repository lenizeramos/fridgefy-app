import { Router } from "express";
import { addRecipes, getRecipes, getUser, removeRecipe } from "../controllers/fetchController";

const router = Router();

router.get("/", getRecipes);
router.post("/wishlist", addRecipes);
router.get("/wishlist", getUser);
router.post("/remove-recipe", removeRecipe);

export default router;
