import { Request, Response, RequestHandler, NextFunction } from "express";
import { fetchRecipes } from "../models/fetchModel";
import { getAuth } from "@clerk/express";
import { findUserByClerkId } from "../models/userModel";
import { prisma } from "../prisma";

const getRecipes = async (req: Request, res: Response) => {
  try {
    const data = await fetchRecipes();
    res.status(200).json({ data });
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
        userId_recipeId: {
          userId: existingUser?.clerkId as string,
          recipeId: id,
        },
      },
    });
    if (existingUser && !existingRecipe) {
      await prisma.recipe.create({
        data: {
          userId: userId!,
          recipeId: id,
          name: name,
          ingredients: ingredients,
          instructions: instructions,
          prepTimeMinutes: prepTimeMinutes,
          cookTimeMinutes: cookTimeMinutes,
          servings: servings,
          difficulty: difficulty,
          cuisine: cuisine,
          tags: tags,
          image: image,
          mealType: mealType,
        },
      });

      res
        .status(200)
        .json({ message: "Recipe saved in the database", status: 200 });
    } else {
      res
        .status(200)
        .json({ message: "Recipe already saved in the databe", status: 400 });
    }
  } catch (error) {
    console.log("Error saving recipe to database: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  try {
    if (userId) {
      const recipes = await prisma.recipe.findMany({
        where: {
          userId,
        },
      });
      res.json(recipes);
    } else {
      res.status(400).json({ error: "User ID not found" });
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

export { getRecipes, addRecipes, getUser };
