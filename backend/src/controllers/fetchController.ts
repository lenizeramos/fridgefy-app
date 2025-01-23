import { Request, Response, RequestHandler, NextFunction } from "express";
import { fetchRecipes } from "../models/fetchModel";
import { clerkClient, getAuth } from "@clerk/express";
import { findUserByClerkId } from "../models/userModel";
import { prisma } from "../prisma";

const getRecipes = async (req: Request, res: Response) => {
  try {
    const data = await fetchRecipes();
    res.json({ data });
  } catch (error) {
    console.log(`Error in getRecipes: ${error}`);
    res.status(500).send("Error fetching data");
  }
};

const addRecipes = async (req: Request, res: Response) => {
  const {
    id,
    name,
    ingredients,
    instructions,
    prepTimeMinutes,
    cookTimeMinutes,
    servings,
    difficulty,
    cuisine,
    tags,
    image,
    mealType,
  } = req.body;
  const { userId } = getAuth(req);

  try {
    const user = userId ? userId : "User Not Found";
    const existingUser = await findUserByClerkId(user);
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        recipeId: id,
      },
    });

    if (!existingUser || existingRecipe) {
      res.status(400).json({ message: "Recipe already saved in the databe" });
    } else {
      await prisma.recipe.create({
        data: {
          userId: userId!,
          recipeId: id,
          recipeName: name,
          recipeIngredients: ingredients,
          recipeInstructions: instructions,
          recipePrepTimeMinutes: prepTimeMinutes,
          recipeCcokTimeMinutes: cookTimeMinutes,
          recipeServings: servings,
          recipeDifficulty: difficulty,
          recipeCuisine: cuisine,
          recipeTags: tags,
          recipeImage: image,
          recipeMealType: mealType,
        },
      });
      res.status(200).json({ message: "Recipe saved in the database" });
    }
  } catch (error) {
    console.log("Error saving recipe to database: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getRecipes, addRecipes };
