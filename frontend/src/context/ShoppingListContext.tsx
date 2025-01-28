import { createContext, useContext, useReducer, useEffect } from "react";
import { ShoppingListState } from "../types/ShoppingListTypes";
import { 
  ShoppingListAction, 
  IShoppingListContext, 
  SHOPPING_LIST_ACTIONS 
} from "../interfaces/ShoppingListInterface";
import { shoppingListService } from "../services/shoppingListServices";
import { useAuthService } from "../services/userAuthService";

const initialState: ShoppingListState = {
  items: [],
  isLoading: false,
  error: null,
  recipesWishList: []
};

const ShoppingListReducer = (
  state: ShoppingListState, 
  action: ShoppingListAction
): ShoppingListState => {

  switch (action.type) {
    case SHOPPING_LIST_ACTIONS.ADD_ITEM:
        if (state.items.find((item) => item.name === action.payload.name)) {
            return {
                ...state,
                items: state.items.map((item) => 
                    item.name === action.payload.name 
                        ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) } 
                        : item
                ),
            };
        }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case SHOPPING_LIST_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items
          .map((item) => 
            item.name === action.payload.name 
              ? { ...item, quantity: Math.max(0, item.quantity - (action.payload.quantity || 1)) }
              : item
          )
          .filter(item => item.quantity > 0),
      };
    case SHOPPING_LIST_ACTIONS.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case SHOPPING_LIST_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SHOPPING_LIST_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SHOPPING_LIST_ACTIONS.REMOVE_RECIPE:
      const recipeToRemove = state.recipesWishList.find(recipe => recipe.id === action.payload);
      if (!recipeToRemove) {
        return state;
      }
      
      const updatedItems = state.items.filter(item => 
        !recipeToRemove.ingredients.includes(item.name)
      );

      return {
        ...state,
        items: updatedItems,
        recipesWishList: state.recipesWishList.filter((recipe) => recipe.id !== action.payload),
      };
    default:
      return state;
  }
}

const ShoppingListContext = createContext<IShoppingListContext | undefined>(undefined);

const ShoppingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, baseDispatch] = useReducer(ShoppingListReducer, initialState);
  const auth = useAuthService();

  const fetchItems = async () => {
    try {
      baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_LOADING, payload: true });
      baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_ERROR, payload: null });

      const userId = auth.getUserId();
      const response = await shoppingListService.getItems({ userId: userId ? userId : "user not logged in" });
      
      const items = Array.isArray(response) ? response.map(item => {

        return {
          id: item.id,
          name: item.name,
          quantity: item.quantity
        };
      }) : [];

      baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_ITEMS, payload: items });
    } catch (error) {
      console.error('Error in fetchItems:', error);
      baseDispatch({ 
        type: SHOPPING_LIST_ACTIONS.SET_ERROR, 
        payload: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    } finally {
      baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_LOADING, payload: false });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const dispatch = async (action: ShoppingListAction): Promise<void> => {
    if (action.type === SHOPPING_LIST_ACTIONS.ADD_ITEM) {
      try {
        baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_LOADING, payload: true });
        baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_ERROR, payload: null });

        const userId = auth.getUserId();
        await shoppingListService.addItem({
          userId: userId ? userId : "user not logged in",
          ingredient: action.payload.name,
          quantity: action.payload.quantity || 1
        });
        
        await fetchItems();
      } catch (error) {
        baseDispatch({ 
          type: SHOPPING_LIST_ACTIONS.SET_ERROR, 
          payload: error instanceof Error ? error.message : 'An unknown error occurred'
        });
      } finally {
        baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_LOADING, payload: false });
      }
    } else if (action.type === SHOPPING_LIST_ACTIONS.REMOVE_ITEM) {
      try {
        baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_LOADING, payload: true });
        baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_ERROR, payload: null });

        const userId = auth.getUserId();
        await shoppingListService.removeItem({
          userId: userId ? userId : "user not logged in",
          ingredient: action.payload.name,
          quantity: action.payload.quantity || 1
        });

        await fetchItems();
      } catch (error) {
        baseDispatch({ 
          type: SHOPPING_LIST_ACTIONS.SET_ERROR, 
          payload: error instanceof Error ? error.message : 'An unknown error occurred'
        });
      } finally {
        baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_LOADING, payload: false });
      }
    } else if (action.type === SHOPPING_LIST_ACTIONS.REMOVE_RECIPE) {
      try {
        baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_LOADING, payload: true });
        baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_ERROR, payload: null });

        const userId = auth.getUserId();
        await shoppingListService.removeRecipe({
          userId: userId ? userId : "user not logged in",
          recipeId: action.payload
        });

      } catch (error) {
        baseDispatch({ 
          type: SHOPPING_LIST_ACTIONS.SET_ERROR, 
          payload: error instanceof Error ? error.message : 'An unknown error occurred'
        });
      } finally {
        baseDispatch({ type: SHOPPING_LIST_ACTIONS.SET_LOADING, payload: false });
      }
    } else {
      baseDispatch(action);
    }
  };
  
  return (
    <ShoppingListContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingListContext.Provider>
  );
}

const useShoppingListContext = (): IShoppingListContext => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error("useShoppingListContext must be used within a ShoppingListProvider");
  }
  return context;
}

export { ShoppingListContext, ShoppingListProvider, useShoppingListContext };