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

export { fetchRecipes, IRecipes };
