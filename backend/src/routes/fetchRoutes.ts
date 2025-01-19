import { Router } from "express";
import { getRecipies } from "../controllers/fetchController";

const router = Router();

router.get("/", getRecipies )

export default router;