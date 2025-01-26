import { createContext, useContext, useReducer } from "react";
import { FridgeAction, IFridgeContext } from "../interfaces/FridgeInterface";
import { FridgeState, Ingredient } from "../types/FridgeTypes";

const initialState: FridgeState = {
  ingredients: [],
};

const FridgeReducer = (
  state: FridgeState,
  action: FridgeAction
): FridgeState => {
  switch (action.type) {
    case "addIngredient": {
      return { ...state, ingredients: [action.payload, ...state.ingredients] };
    }
    case "removeIngredient": {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id != action.payload
        ),
      };
    }
    case "setIngredients": {
      return { ...state, ingredients: action.payload };
    }
    default:
      return state;
  }
};

const FridgeContext = createContext<IFridgeContext | undefined>(undefined);

const FridgeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(FridgeReducer, initialState);

  return (
    <FridgeContext.Provider value={{ state, dispatch }}>
      {children}
    </FridgeContext.Provider>
  );
};

const useFridgeContext = (): IFridgeContext => {
  const context = useContext(FridgeContext);
  if (!context) {
    throw new Error("useFridgeContext must be used within a FridgeProvider");
  }
  return context;
};

const addIngredientToFridge = async (
  ingredient: Ingredient,
  dispatch: React.Dispatch<FridgeAction>,
  token: string | null
) => {
  try {
    const response = await fetch(
      "http://localhost:3000/fridge/ingredient/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ingredient),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.error || "An error occurred. Please try again.";
      throw new Error(errorMessage);
    }

    const result = await response.json();

    dispatch({ type: "addIngredient", payload: result.response });
  } catch (err) {
    console.error((err as Error).message);
  }
};

const removeIngredientFromFridge = async (
  id: string,
  dispatch: React.Dispatch<FridgeAction>,
  token: string | null
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/fridge/ingredient/remove/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.error || "An error occurred. Please try again.";
      throw new Error(errorMessage);
    }
    dispatch({ type: "removeIngredient", payload: id });
  } catch (err) {
    console.error((err as Error).message);
  }
};

const fetchIngredients = async (
  dispatch: React.Dispatch<FridgeAction>,
  token: string | null
) => {
  try {
    const response = await fetch(
      "http://localhost:3000/fridge/ingredients",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || "Failed to fetch ingredients.";
      throw new Error(errorMessage);
    }

    const result = await response.json();
    dispatch({ type: "setIngredients", payload: result });
  } catch (err) {
    console.error((err as Error).message);
    throw err;
  }
};

export {
  FridgeProvider,
  useFridgeContext,
  addIngredientToFridge,
  removeIngredientFromFridge,
  fetchIngredients,
};
