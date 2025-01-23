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
  ingredients: string[];
  tags: string[];
};

type RecipesAction =
  | { type: "setRecipes"; payload: Recipes[] }
  | { type: "findRecipes"; payload: number }
  | { type: "ingredientsArray"; payload: { ingredients: string | string[] }[] }
  | { type: "tagsArray"; payload: { tags: string | string[] }[] }
  | { type: "addWishList"; payload: Recipes };

interface IRecipesContext {
  state: RecipesState;
  dispatch: React.Dispatch<RecipesAction>;
  fetchData: () => Promise<void>;
}

const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
  ingredients: [],
  tags: [],
};

const RecipesReducer = (
  state: RecipesState,
  action: RecipesAction
): RecipesState => {
  switch (action.type) {
    case "setRecipes": {
      return {
        ...state,
        recipes: action.payload,
      };
    }
    case "findRecipes": {
      const selectedRecipe = state.recipes.find(
        (recipe) => recipe.id === action.payload
      );
      return {
        ...state,
        selectedRecipe: selectedRecipe || null,
      };
    }
    case "ingredientsArray": {
      const uniqueIngredients = Array.from(
        action.payload.reduce((acc, cur) => {
          if (Array.isArray(cur.ingredients)) {
            cur.ingredients.forEach((ingredient) => acc.add(ingredient));
          } else if (typeof cur.ingredients === "string") {
            acc.add(cur.ingredients);
          }
          return acc;
        }, new Set<string>())
      );
      return {
        ...state,
        ingredients: uniqueIngredients,
      };
    }
    case "tagsArray": {
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
    }
    case "addWishList": {
      async () => {
        try {
          const response = await fetch("http://localhost:3000/fetch/wishlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: action.payload.id,
              name: action.payload.name,
              ingredients: action.payload.ingredients,
              instructions: action.payload.instructions,
              prepTimeMinutes: action.payload.prepTimeMinutes,
              cookTimeMinutes: action.payload.cookTimeMinutes,
              servings: action.payload.servings,
              difficulty: action.payload.difficulty,
              cuisine: action.payload.cuisine,
              tags: action.payload.tags,
              image: action.payload.image,
              mealType: action.payload.mealType

            }),
          });
          if (!response.ok) {
            throw new Error(
              `Failed to add to wishlist: ${response.statusText}`
            );
          }
          const data = await response.json();
          console.log("Success:", data);
        } catch (error) {
          throw new Error("Error fetching data");
        }
      };
      return {
        ...state,
      };
    }
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
      dispatch({ type: "ingredientsArray", payload: data });
      dispatch({ type: "tagsArray", payload: data });
    } catch (error) {
      console.error("Error fetching recipes:", error);
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
