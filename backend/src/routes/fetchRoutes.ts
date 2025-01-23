import { Router } from "express";
import { addRecipes, getRecipes } from "../controllers/fetchController";

const router = Router();

router.get("/", getRecipes);
router.post("/wishlist", addRecipes);

export default router;
