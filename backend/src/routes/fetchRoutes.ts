import { Router } from "express";
import { getRecipies } from "../controllers/fetchController";

const router = Router();

router.get('/fetch', getRecipies )

export default router;