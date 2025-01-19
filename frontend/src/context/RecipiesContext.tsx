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
}

type RecipesState = {
    recipies: Recipes[]
}

type RecipesAction = 
| {type: 'addRecipie'}