export interface Message {
    role: string;
    userId: string | null;
    content: string;
}

export interface AgentState {
    messages: Message[];
}

export interface AgentSendMessageRequest {
    userId: string;
    message: string;
}

export interface ApiMessageResponse {
    success: boolean;
    message?: Message;
}