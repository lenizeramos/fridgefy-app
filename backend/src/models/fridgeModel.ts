import { prisma } from "../prisma";

export const addIngredient = async (
  userId: string,
  ingredientName: string,
  expirationDate: string,
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

export const removeIngredient = async (id: string, userId: string) => {
  try {
    const deletedIngredient = await prisma.fridge.delete({
      where: {
        id,
        userId
      },
    });
    return deletedIngredient;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete ingredients.");
  } finally {
    await prisma.$disconnect();
  }
};
