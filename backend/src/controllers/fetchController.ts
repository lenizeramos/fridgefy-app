import { Request, Response, RequestHandler, NextFunction } from "express";
import { fetchRecipes } from "../models/fetchModel";
import { getAuth } from "@clerk/express";

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
  console.log(userId);
  console.log(id, name);

  // try {

  // } catch (error) {
  //   console.log("Error saving recipe to database: ", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
};

export { getRecipes, addRecipes };
