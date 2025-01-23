import { Response, Request } from "express";
import { getAuth } from "@clerk/express";
import {
  addIngredient,
  getIngredients,
  removeIngredient,
} from "../models/fridgeModel";

export const addIngredientToFridge = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { ingredientName, expirationDate } = req.body;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!ingredientName || !expirationDate) {
    res
      .status(400)
      .json({ error: "Both ingredient and expiry date are required." });
    return;
  }

  try {
    const response = await addIngredient(
      userId,
      ingredientName,
      expirationDate
    );

    res
      .status(200)
      .json({ message: "Ingredient added to fridge successfully!", response });
  } catch (error) {
    console.error("Error adding ingredient to fridge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFridge = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const ingredients = await getIngredients(userId);

    //expiry -return 2 objects

    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching fridge ingredients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  return;
};

export const removeIngredientFromFridge = async (
  req: Request,
  res: Response
) => {
  const { userId } = getAuth(req);
  const { id } = req.params;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!id) {
    res.status(400).json({ error: "Ingredient 'id' is required." });
    return;
  }

  try {
    const response = await removeIngredient(id, userId);

    res.status(200).json({
      message: "Ingredient removed from fridge successfully!",
      response,
    });
  } catch (error) {
    console.error("Error removing ingredient from fridge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
