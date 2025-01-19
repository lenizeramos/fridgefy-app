import { createContext, useContext, useEffect, useReducer } from "react";

type Recipes = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
};

type RecipesState = {
  recipes: Recipes[];
  selectedRecipe: Recipes | null;
};

type RecipesAction =
  | { type: "setRecipes"; payload: Recipes[] }
  | { type: "findRecipes"; payload: number };

interface IRecipesContext {
  state: RecipesState;
  dispatch: React.Dispatch<RecipesAction>;
  fetchData: () => Promise<void>;
}

const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
};

const RecipesReducer = (
  state: RecipesState,
  action: RecipesAction
): RecipesState => {
  switch (action.type) {
    case "setRecipes":
      return {
        ...state,
        recipes: action.payload,
      };
    case "findRecipes":
      const selectedRecipe = state.recipes.find(
        (recipe) => recipe.id === action.payload
      );
      return {
        ...state,
        selectedRecipe: selectedRecipe || null,
      };
    default:
      return state;
  }
};

const RecipesContext = createContext<IRecipesContext | undefined>(undefined);

const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(RecipesReducer, initialState);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/fetch");
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data: Recipes[] = await response.json();
      dispatch({ type: "setRecipes", payload: data });
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RecipesContext.Provider value={{ state, dispatch, fetchData }}>
      {children}
    </RecipesContext.Provider>
  );
};

const useRecipesContext = (): IRecipesContext => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipesContext must be used within a RecipesProvider ");
  }
  return context;
};

export { RecipesProvider, useRecipesContext };
