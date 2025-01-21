import { createContext, useContext, useReducer } from "react";
import { ShoppingListState } from "../types/ShoppingListTypes";
import { ShoppingListAction, IShoppingListContext } from "../interfaces/ShoppingListInterface";

const initialState: ShoppingListState = {
    items: []
  };

  const ShoppingListReducer = (
    state: ShoppingListState, 
    action: ShoppingListAction
  ): ShoppingListState => {
    switch (action.type) {
        case "addItem":
            const itemExists = state.items.find((item) => item.name === action.payload.name);
            if (itemExists) {
                return {
                    ...state,
                    items: state.items.map((item) => item.name === action.payload.name ? { ...item, quantity: item.quantity + 1 } : item),
                };
            }
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case "removeItem":
            const itemToRemove = state.items.find((item) => item.name === String(action.payload));
            if (itemToRemove) {
                return {
                    ...state,
                    items: state.items.map((item) => item.name === String(action.payload) ? { ...item, quantity: item.quantity - 1 } : item),
                };
            }
            return state;
        case "setItems":
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
  }

  const ShoppingListContext = createContext<IShoppingListContext | undefined>(undefined);

  const ShoppingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ShoppingListReducer, initialState);
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