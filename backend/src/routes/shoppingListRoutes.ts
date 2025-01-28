import { Router } from "express";
import { addToShoppingList, removeFromShoppingList, getShoppingList } from "../controllers/shoppingListController";

const shoppingListRouter = Router();

shoppingListRouter.post("/add", addToShoppingList);
shoppingListRouter.post("/remove", removeFromShoppingList);
shoppingListRouter.get("/get", getShoppingList);

export { shoppingListRouter };