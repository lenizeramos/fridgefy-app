import { prisma } from "../prisma";
import { ShoppingListResponse } from "../interfaces/shoppingListInterface";

export const addItemToShoppingList = async (userId: string, ingredientName: string, quantity: number) => {
  const existingItem = await prisma.shoppingList.findFirst({
    where: { userId, ingredientName }
  });

  if (existingItem) {
    return await prisma.shoppingList.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity ? existingItem.quantity + quantity : quantity }
    });
  }

  return await prisma.shoppingList.create({
    data: { userId, ingredientName, quantity },
  });
};

export const removeItemFromShoppingList = async (userId: string, ingredientName: string) => {
  return await prisma.shoppingList.deleteMany({ where: { userId, ingredientName } });
};

export const getShoppingListModel = async (userId: string): Promise<ShoppingListResponse[]> => {
  const shoppingList = await prisma.shoppingList.findMany({ where: { userId } });

  if (!shoppingList) {
    return [];
  }

  return shoppingList.map(item => ({
    userId: item.userId,
    ingredientName: item.ingredientName,
    quantity: item.quantity ?? 0,
  }));
};