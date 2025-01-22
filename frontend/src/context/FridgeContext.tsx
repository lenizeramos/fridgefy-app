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
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    }
    case "removeIngredient": {
      return {
        ...state,
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
    console.log("contect token", ingredient);

    const response = await fetch("http://localhost:3000/fridge/ingredient/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ingredient),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.error || "An error occurred. Please try again.";
      throw new Error(errorMessage);
    }

    const result = await response.json();
    dispatch({ type: "addIngredient", payload: result.response });
    console.log("Successfully added:", result);
  } catch (err) {
    console.error((err as Error).message);
  }
};

export { FridgeProvider, useFridgeContext, addIngredientToFridge };
