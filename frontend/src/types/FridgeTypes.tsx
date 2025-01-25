export type FridgeState = {
  ingredients: Ingredient[];
};

export type Ingredient = {
  id?: string;
  ingredientName: string;
  expirationDate: string;
};
