import { Item } from "./RecipiesTypes";

export interface ShoppingListState {
  items: Item[];
  isLoading: boolean;
  error: string | null;
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