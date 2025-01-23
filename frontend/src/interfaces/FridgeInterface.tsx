import { FridgeState, Ingredient} from "../types/FridgeTypes";

type FridgeAction =
  | { type: "addIngredient"; payload: Ingredient }
  | { type: "removeIngredient"; payload: string }
  | { type: "setIngredients"; payload: Ingredient[] };

interface IFridgeContext {
  state: FridgeState;
  dispatch: React.Dispatch<FridgeAction>;
}

export type { FridgeAction, IFridgeContext };