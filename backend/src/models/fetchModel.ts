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
  name: string,
  ingredients: string[],
  instructions: string[],
  prepTimeMinutes: number,
  cookTimeMinutes: number,
  servings: number,
  difficulty: string,
  cuisine: string,
  tags: string[],
  image: string,
  mealType: string[]
) => {
  return await prisma.recipe.create({
    data: {
      userId,
      recipeId,
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      tags,
      image,
      mealType,
    },
  });
};

export { fetchRecipes, IRecipes, addRecipe };
