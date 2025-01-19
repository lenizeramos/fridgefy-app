import { Request, Response, RequestHandler, NextFunction } from "express";
import { fetchRecipes } from "../models/fetchModel";

const getRecipes = async (req: Request, res: Response) => {
  try {
    const data = await fetchRecipes();
    console.log(data)
    res.json(
      {
        message: 'Ok',
        response: data
      }
    );
  } catch (error) {
    console.log(`Error in getRecipes: ${error}`);
    res.status(500).send("Error fetching data");
  }
};

export { getRecipes }
