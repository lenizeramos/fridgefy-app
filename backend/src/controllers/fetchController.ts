import { Request, Response, RequestHandler, NextFunction } from "express";
import { fetchRecipes } from "../models/fetchModel";

const getRecipes = async (req: Request, res: Response) => {
  try {
    const data = await fetchRecipes();
    res.json({ data });
  } catch (error) {
    console.log(`Error in getRecipes: ${error}`);
    res.status(500).send("Error fetching data");
  }
};

export { getRecipes };
