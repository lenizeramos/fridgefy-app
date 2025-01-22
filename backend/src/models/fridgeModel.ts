import { prisma } from "../prisma";

export const addIngredient = async (
  userId: string,
  ingredientName: string,
  expirationDate: string,
  quantity: number
) => {
  return await prisma.fridge.create({
    data: {
      userId,
      ingredientName,
      expirationDate: new Date(expirationDate),
      quantity,
    },
  });
};


