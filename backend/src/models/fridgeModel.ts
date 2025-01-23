import { prisma } from "../prisma";

export const addIngredient = async (
  userId: string,
  ingredientName: string,
  expirationDate: string
) => {
  return await prisma.fridge.create({
    data: {
      userId,
      ingredientName,
      expirationDate: new Date(expirationDate),
    },
  });
};

export const getIngredients = async (userId: string) => {
  try {
    const ingredients = await prisma.fridge.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return ingredients;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw new Error("Failed to fetch ingredients.");
  }
};
