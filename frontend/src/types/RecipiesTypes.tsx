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

  export type Item = {
    id: string;
    name: string;
    quantity: number;
  };
  
  export type RecipesState = {
    recipes: Recipes[];
    selectedRecipe: Recipes | null;
    tags: string[];
  };
  
  