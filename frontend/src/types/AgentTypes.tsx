import { Item } from "./RecipiesTypes";

export interface Message {
    role: string;
    userId: string | null;
    content: string;
}

export interface AgentState {
    messages: Message[];
    itemsAdded: Item | null;
}

export interface AgentSendMessageRequest {
    userId: string;
    message: string;
}

export interface ApiMessageResponse {
    success: boolean;
    message?: Message;
    itemsAdded?: string;
}