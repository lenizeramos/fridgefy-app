import { createContext, useReducer, useContext } from "react";
import { AGENT_ACTIONS, IAgentContext } from "../interfaces/AgentInterface";
import { SHOPPING_LIST_ACTIONS } from "../interfaces/ShoppingListInterface";
import { AgentState, Message } from "../types/AgentTypes";
import { AgentAction } from "../interfaces/AgentInterface";
import { useAuthService } from "../services/userAuthService";
import { agentService } from "../services/agentService";
import { ShoppingListAction } from "../interfaces/ShoppingListInterface";
import { Item } from "../types/RecipiesTypes";
import { useShoppingListContext } from "./ShoppingListContext";
import { shoppingListService } from "../services/shoppingListServices";

const initialState: AgentState = {
    messages: [],
    agentActionResponse: null,
};

const AgentReducer = (state: AgentState, action: AgentAction | ShoppingListAction): AgentState => {
    switch (action.type) {
        case AGENT_ACTIONS.SET_MESSAGES:
            return { ...state, messages: action.payload as Message[] };
        case AGENT_ACTIONS.SEND_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload as Message] };
        case SHOPPING_LIST_ACTIONS.ADD_ITEM:
            return { ...state, agentActionResponse: action.payload as Item };
        default:
            return state;
    }
};

const AgentContext = createContext<IAgentContext | undefined>(undefined);

const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(AgentReducer, initialState);
    const auth = useAuthService();
    const { dispatch: shoppingListDispatch } = useShoppingListContext();

    const sendMessage = async (message: string) => {
        try {
            const userId = auth.getUserId();
            const userMessage = {
                role: "user",
                content: message,
                userId: userId ? userId : "user not logged in",
            };

            dispatch({ 
                type: AGENT_ACTIONS.SEND_MESSAGE, 
                payload: userMessage 
            });

            const response = await agentService.sendMessage({ 
                userId: userMessage.userId, 
                message 
            });

            console.log("response ¡¡¡¡¡", response);
            
            if (response.success && response.message) {
                dispatch({ 
                    type: AGENT_ACTIONS.SEND_MESSAGE,
                    payload: response.message
                });

                if (response.agentActionResponse) {
                    console.log("response.agentActionResponse", response.agentActionResponse);
                    await shoppingListDispatch({ 
                        type: SHOPPING_LIST_ACTIONS.SET_LOADING, 
                        payload: true 
                    });
                    await shoppingListDispatch({ 
                        type: SHOPPING_LIST_ACTIONS.SET_ITEMS, 
                        payload: await shoppingListService.getItems({ 
                            userId: userId ? userId : "user not logged in" 
                        }) 
                    });
                    await shoppingListDispatch({ 
                        type: SHOPPING_LIST_ACTIONS.SET_LOADING, 
                        payload: false 
                    });
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return <AgentContext.Provider value={{ state, dispatch, sendMessage }}>{children}</AgentContext.Provider>;
};

const useAgentContext = (): IAgentContext => {
    const context = useContext(AgentContext);
    if (!context) {
        throw new Error("useAgentContext must be used within a AgentProvider");
    }
    return context;
}

export { AgentContext, AgentProvider, useAgentContext };