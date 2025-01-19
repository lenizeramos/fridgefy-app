interface IRecipies {
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

const fetchRecipies = async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data: { recipes: IRecipies[] } = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Error in fetchRecipies:", error);
    throw new Error("Error fetching API");
  }
};

export { fetchRecipies, IRecipies };
