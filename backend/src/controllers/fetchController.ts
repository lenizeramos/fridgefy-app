import { Request, Response, RequestHandler, NextFunction } from "express";
import { fetchRecipies } from "../models/fetchModel";

const getRecipies = async (req: Request, res: Response) => {
  try {
    const data = await fetchRecipies();
    res.json(data);
  } catch (error) {
    console.log(`Error in getRecipies: ${error}`);
    res.status(500).send("Error fetching data");
  }
};

export { getRecipies }
