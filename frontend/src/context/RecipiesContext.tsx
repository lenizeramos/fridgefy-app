import { createContext, useContext, useEffect, useReducer } from "react";

export type Recipes = {
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
  tags: string[];
};

type RecipesAction =
  | { type: "setRecipes"; payload: Recipes[] }
  | { type: "findRecipes"; payload: number }
  | { type: "tagsArray"; payload: { tags: string | string[] }[] };

interface IRecipesContext {
  state: RecipesState;
  dispatch: React.Dispatch<RecipesAction>;
  fetchData: () => Promise<void>;
}

const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
  tags: [],
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
    case "tagsArray":
      const uniqueTags = Array.from(
        action.payload.reduce((acc, cur) => {
          if (Array.isArray(cur.tags)) {
            cur.tags.forEach((tag) => acc.add(tag));
          } else if (typeof cur.tags === "string") {
            acc.add(cur.tags);
          }
          return acc;
        }, new Set<string>())
      );
      return {
        ...state,
        tags: uniqueTags,
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
      const result = await response.json();
      const data: Recipes[] = result.data;
      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format");
      }
      dispatch({ type: "setRecipes", payload: data });
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

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
