import { AddItemRequest, RemoveItemRequest, GetItemsRequest, ApiResponse } from '../types/ShoppingListTypes';

export const shoppingListService = {
  async addItem(params: AddItemRequest): Promise<ApiResponse> {
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

  async removeItem(params: RemoveItemRequest): Promise<ApiResponse> {
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

      const data = await response.json();

      if (data.length === 0) {  
        return { success: true, data: [] };
      }

      return data;

    } catch (error) {
      throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
  },

  async getItems(params: GetItemsRequest): Promise<ApiResponse> {
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
  }
};