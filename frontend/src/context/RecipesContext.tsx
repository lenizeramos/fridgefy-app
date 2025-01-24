import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

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
  ingredients: string[];
  tags: string[];
};

type RecipesAction =
  | { type: "setRecipes"; payload: Recipes[] }
  | { type: "ingredientsArray"; payload: { ingredients: string | string[] }[] }
  | { type: "tagsArray"; payload: { tags: string | string[] }[] };

interface IRecipesContext {
  state: RecipesState;
  dispatch: React.Dispatch<RecipesAction>;
  fetchData: () => Promise<void>;
  addFunction: (recipe: Recipes, token: string | null) => Promise<void>;
  getRecipeUser: (token: string | null) => Promise<void>;
}

const initialState: RecipesState = {
  recipes: [],
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

  const addFunction = async (recipe: Recipes, token: string | null) => {
    try {
      const response = await fetch("http://localhost:3000/fetch/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: recipe.id,
          name: recipe.name,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          prepTimeMinutes: recipe.prepTimeMinutes,
          cookTimeMinutes: recipe.cookTimeMinutes,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          cuisine: recipe.cuisine,
          tags: recipe.tags,
          image: recipe.image,
          mealType: recipe.mealType,
        }),
      });
      if (!response.ok) {
        toast.error(`${recipe.name} is already in your wish list`, {
          position: "bottom-right",
        });
      } else {
        toast.success(
          `Yeiii!!! ${recipe.name} has beed added to your wish list`,
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const getRecipeUser = async (token: string | null) => {
    try {
      const response = await fetch("http://localhost:3000/fetch/wishlist", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log("Error fetching data");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RecipesContext.Provider
      value={{ state, dispatch, fetchData, addFunction, getRecipeUser }}
    >
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
