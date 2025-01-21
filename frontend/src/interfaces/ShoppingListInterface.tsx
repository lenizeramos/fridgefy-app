import { Item } from "../types/RecipiesTypes";
import { ShoppingListState } from "../types/ShoppingListTypes";

type ShoppingListAction =
  | { type: "addItem"; payload: Item }
  | { type: "removeItem"; payload: number }
  | { type: "setItems"; payload: Item[] };

interface IShoppingListContext {
  state: ShoppingListState;
  dispatch: React.Dispatch<ShoppingListAction>;
}

export type { ShoppingListAction, IShoppingListContext };
