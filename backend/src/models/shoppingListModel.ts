import { prisma } from "../prisma";
import { ShoppingListResponse } from "../interfaces/shoppingListInterface";

export const addItemToShoppingList = async (userId: string, name: string, quantity: number) => {
  const existingItem = await prisma.shoppingList.findFirst({
    where: { userId, name }
  });

  if (existingItem) {
    return await prisma.shoppingList.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity ? existingItem.quantity + quantity : quantity }
    });
  }

  return await prisma.shoppingList.create({
    data: { userId, name, quantity },
  });
};

export const removeItemFromShoppingList = async (userId: string, name: string) => {
  return await prisma.shoppingList.deleteMany({ where: { userId, name } });
};

export const getShoppingListModel = async (userId: string): Promise<ShoppingListResponse[]> => {
  const shoppingList = await prisma.shoppingList.findMany({ where: { userId } });

  if (!shoppingList) {
    return [];
  }

  return shoppingList.map(item => ({
    userId: item.userId,
    name: item.name,
    quantity: item.quantity ?? 0,
  }));
};