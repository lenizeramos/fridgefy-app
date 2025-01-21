import { Response, Request } from "express";
import { getAuth } from "@clerk/express";
import { addIngredient } from "../models/fridgeModel";

export const addIngredientToFridge = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { ingredient, expiryDate } = req.body;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!ingredient || !expiryDate) {
    res
      .status(400)
      .json({ error: "Both ingredient and expiry date are required." });
    return;
  }

  try {
    await addIngredient(userId, ingredient, expiryDate);

    res
      .status(200)
      .json({ message: "Ingredient added to fridge successfully!" });
  } catch (error) {
    console.error("Error adding ingredient to fridge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
