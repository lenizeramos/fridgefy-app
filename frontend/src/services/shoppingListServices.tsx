import { AddItemRequest, RemoveItemRequest, GetItemsRequest, RemoveRecipeRequest } from '../types/ShoppingListTypes';
import toast from "react-hot-toast";

export const shoppingListService = {
  async addItem(params: AddItemRequest): Promise<any> {
    try {
      const response = await fetch('http://localhost:3000/shopping-list/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add item to shopping list');
      }
      
      return await response.json();
    } catch (error) {
      throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
  },

  async removeItem(params: RemoveItemRequest): Promise<any> {
    try {
      const response = await fetch('http://localhost:3000/shopping-list/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from shopping list');
      }

      return await response.json();
    } catch (error) {
      throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
  },

  async getItems(params: GetItemsRequest): Promise<any> {
    try {
      const response = await fetch(`http://localhost:3000/shopping-list/get?userId=${params.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get items from shopping list');
      }

      const data = await response.json();

      if (data.length === 0) {
        return { success: true, data: [] };
      }

      return data;

    } catch (error) {
      throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
  },

  async removeRecipe(params: RemoveRecipeRequest): Promise<any> {
    try {
      const response = await fetch('http://localhost:3000/fetch/remove-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error('Failed to remove recipe');
      }

      console.log("response", response);

      toast.success(
        `Yeiii!!! the recipe has been removed from your wish list`,
        {
          position: "bottom-right",
        }
      );

      return await response.json();
    } catch (error) {
      throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
  }
};