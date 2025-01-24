import { createContext, useReducer, useContext } from "react";
import { AGENT_ACTIONS, IAgentContext } from "../interfaces/AgentInterface";
import { AgentState, Message } from "../types/AgentTypes";
import { AgentAction } from "../interfaces/AgentInterface";
import { useAuthService } from "../services/userAuthService";
import { agentService } from "../services/agentService";

const initialState: AgentState = {
    messages: [],
};

const AgentReducer = (state: AgentState, action: AgentAction): AgentState => {
    switch (action.type) {
        case AGENT_ACTIONS.SET_MESSAGES:
            return { ...state, messages: action.payload as Message[] };
        case AGENT_ACTIONS.SEND_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload as Message] };
        default:
            return state;
    }
};

const AgentContext = createContext<IAgentContext | undefined>(undefined);

const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(AgentReducer, initialState);
    const auth = useAuthService();

    const sendMessage = async (message: string) => {
        try {
            const userId = auth.getUserId();

            console.log(userId);

            dispatch({ type: AGENT_ACTIONS.SEND_MESSAGE, payload: {
                role: "user",
                content: message,
                userId: userId ? userId : "user not logged in",
            } });

            console.log("sending message");
            console.log(message);

            const response = await agentService.sendMessage({ userId: userId ? userId : "user not logged in", message });
            
            console.log(response);
            
            dispatch({ type: AGENT_ACTIONS.SEND_MESSAGE,
                payload: {
                    role: "agent",
                    userId: "assistant1",
                    content: response.message?.content || ""
                }
            });

            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

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