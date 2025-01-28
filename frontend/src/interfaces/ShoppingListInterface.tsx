import { Item } from "../types/RecipiesTypes";
import { ShoppingListState } from "../types/ShoppingListTypes";

export const SHOPPING_LIST_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_ITEMS: 'SET_ITEMS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  REMOVE_RECIPE: 'REMOVE_RECIPE',
} as const;

export type ShoppingListAction =
  | { type: typeof SHOPPING_LIST_ACTIONS.ADD_ITEM; payload: Item }
  | { type: typeof SHOPPING_LIST_ACTIONS.REMOVE_ITEM; payload: Item }
  | { type: typeof SHOPPING_LIST_ACTIONS.SET_ITEMS; payload: Item[] }
  | { type: typeof SHOPPING_LIST_ACTIONS.SET_LOADING; payload: boolean }
  | { type: typeof SHOPPING_LIST_ACTIONS.SET_ERROR; payload: string | null }
  | { type: typeof SHOPPING_LIST_ACTIONS.REMOVE_RECIPE; payload: number };

export interface IShoppingListContext {
  state: ShoppingListState;
  dispatch: (action: ShoppingListAction) => Promise<void>;
}