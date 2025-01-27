import { Item, Recipes } from "./RecipiesTypes";

export interface ShoppingListState {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  recipesWishList: Recipes[];
}

export interface AddItemRequest {
  userId: string;
  ingredient: string;
  quantity: number;
}

export interface RemoveItemRequest {
  userId: string;
  ingredient: string;
  quantity: number;
}

export interface GetItemsRequest {
  userId: string;
}

export interface RemoveRecipeRequest {
  userId: string;
  recipeId: number;
}