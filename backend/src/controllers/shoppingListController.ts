import { Request, Response } from "express";
import { addItemToShoppingList, removeItemFromShoppingList, getShoppingListModel } from "../models/shoppingListModel";

export const addToShoppingList = async (req: Request, res: Response) => {
  const { ingredient, quantity, userId } = req.body;
  const shoppingList = await addItemToShoppingList(userId, ingredient, quantity);
  res.json(shoppingList);
};

export const removeFromShoppingList = async (req: Request, res: Response) => {
  const { ingredient, userId } = req.body;
  const shoppingList = await removeItemFromShoppingList(userId, ingredient);
  res.json(shoppingList);
};

export const getShoppingList = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const shoppingList = await getShoppingListModel(userId);
  res.json(shoppingList);
};