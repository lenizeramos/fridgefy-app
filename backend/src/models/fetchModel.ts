import { prisma } from "../prisma";

interface IRecipes {
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
}

const fetchRecipes = async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data: { recipes: IRecipes[] } = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Error in fetchRecipes:", error);
    throw new Error("Error fetching API");
  }
};

const addRecipe = async (
  userId: string,
  recipeId: number,
  recipeName: string,
  recipeIngredients: string[],
  recipeInstructions: string[],
  recipePrepTimeMinutes: number,
  recipeCcokTimeMinutes: number,
  recipeServings: number,
  recipeDifficulty: string,
  recipeCuisine: string,
  recipeTags: string[],
  recipeImage: string,
  recipeMealType: string[]
) => {
  return await prisma.recipe.create({
    data: {
      userId,
      recipeId,
      recipeName,
      recipeIngredients,
      recipeInstructions,
      recipePrepTimeMinutes,
      recipeCcokTimeMinutes,
      recipeServings,
      recipeDifficulty,
      recipeCuisine,
      recipeTags,
      recipeImage,
      recipeMealType,
    },
  });
};

export { fetchRecipes, IRecipes, addRecipe };
