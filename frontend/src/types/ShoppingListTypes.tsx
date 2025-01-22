import { Item } from "./RecipiesTypes";

export interface ShoppingListState {
  items: Item[];
  isLoading: boolean;
  error: string | null;
}

// Add some utility types
export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
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