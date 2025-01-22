export interface ItemParams {
    userId: string;
    ingredientName: string;
    quantity: number;
  }
  
  export interface ShoppingListResponse {
    userId: string;
    ingredientName: string;
    quantity: number;
  }
  
  export interface ShoppingListState {
    items: ShoppingListResponse[];
  }