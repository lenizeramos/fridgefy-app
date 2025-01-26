export interface ItemParams {
    userId: string;
    name: string;
    quantity: number;
  }
  
  export interface ShoppingListResponse {
    userId: string;
    name: string;
    quantity: number;
  }
  
  export interface ShoppingListState {
    items: ShoppingListResponse[];
  }