import { Item } from "./RecipiesTypes";

export interface Message {
    role: string;
    userId: string | null;
    content: string;
}

export interface AgentState {
    messages: Message[];
    agentActionResponse: Item | null;
}

export interface AgentSendMessageRequest {
    userId: string;
    message: string;
}

export interface ApiMessageResponse {
    success: boolean;
    message?: Message;
    agentActionResponse?: string;
}