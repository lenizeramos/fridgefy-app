import { Router } from "express";
import { addRecipes, getRecipes, getUser } from "../controllers/fetchController";

const router = Router();

router.get("/", getRecipes);
router.post("/wishlist", addRecipes);
router.get("/wishlist", getUser)

export default router;
