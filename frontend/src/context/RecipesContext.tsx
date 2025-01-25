import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { useAuthService } from "../services/userAuthService";

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
  names: string[];
  ingredients: string[];
  tags: string[];
  mealsType: string[];
  cuisines: string[];
  recipesWishList: Recipes[];
};

type RecipesAction =
  | { type: "setRecipes"; payload: Recipes[] }
  | { type: "namesArray"; payload: { name: string | string[] }[] }
  | { type: "ingredientsArray"; payload: { ingredients: string | string[] }[] }
  | { type: "tagsArray"; payload: { tags: string | string[] }[] }
  | { type: "mealsTypeArray"; payload: { mealType: string | string[] }[] }
  | { type: "cousinesArray"; payload: { cuisine: string | string[] }[] }
  | { type: "setRecipesWishList"; payload: Recipes[] };

interface IRecipesContext {
  state: RecipesState;
  dispatch: React.Dispatch<RecipesAction>;
  fetchData: () => Promise<void>;
  addFunction: (recipe: Recipes) => Promise<void>;
  fetchRecipesUser: () => Promise<void>;
}

const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
  names: [],
  ingredients: [],
  tags: [],
  mealsType: [],
  cuisines: [],
  recipesWishList: [],
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
    case "namesArray":
      const uniqueNames = Array.from(
        action.payload.reduce((acc, cur) => {
          if (Array.isArray(cur.name)) {
            cur.name.forEach((item) => acc.add(item));
          } else if (typeof cur.name === "string") {
            acc.add(cur.name);
          }
          return acc;
        }, new Set<string>())
      );
      return {
        ...state,
        names: uniqueNames,
      };
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
    case "mealsTypeArray":
      const uniqueMealsType = Array.from(
        action.payload.reduce((acc, cur) => {
          if (Array.isArray(cur.mealType)) {
            cur.mealType.forEach((item) => acc.add(item));
          } else if (typeof cur.mealType === "string") {
            acc.add(cur.mealType);
          }
          return acc;
        }, new Set<string>())
      );
      return {
        ...state,
        mealsType: uniqueMealsType,
      };
    case "cousinesArray":
      const uniqueCousines = Array.from(
        action.payload.reduce((acc, cur) => {
          if (Array.isArray(cur.cuisine)) {
            cur.cuisine.forEach((item) => acc.add(item));
          } else if (typeof cur.cuisine === "string") {
            acc.add(cur.cuisine);
          }
          return acc;
        }, new Set<string>())
      );
      console.log('action=>',action.payload)
      return {
        ...state,
        cuisines: uniqueCousines,
      };
    case "setRecipesWishList": {
      return {
        ...state,
        recipesWishList: action.payload,
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
  const auth = useAuthService();

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
      dispatch({ type: "namesArray", payload: data });
      dispatch({ type: "ingredientsArray", payload: data });
      dispatch({ type: "tagsArray", payload: data });
      dispatch({ type: "mealsTypeArray", payload: data });
      dispatch({ type: "cousinesArray", payload: data });
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw new Error("Error fetching data");
    }
  };

  const addFunction = async (recipe: Recipes) => {
    try {
      const token = await auth.getToken();
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
        throw new Error("Internal sever error");
      } else {
        const res = await response.json();
        if (res.status === 400) {
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
          dispatch({
            type: "setRecipesWishList",
            payload: [...state.recipesWishList, recipe],
          });
        }
      }
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const fetchRecipesUser = async () => {
    try {
      const token = await auth.getToken();
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
      dispatch({ type: "setRecipesWishList", payload: result });
      // return result
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = await auth.getToken();
        // console.log(token)
        if (token) {
          await fetchRecipesUser();
          fetchData();
        } else {
          fetchData();
        }
      } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <RecipesContext.Provider
      value={{ state, dispatch, fetchData, addFunction, fetchRecipesUser }}
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
