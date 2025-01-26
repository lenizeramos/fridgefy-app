import { AgentSendMessageRequest, ApiMessageResponse, Message } from "../types/AgentTypes";

export const agentService = {
    async sendMessage(params: AgentSendMessageRequest): Promise<ApiMessageResponse> {
        const response = await fetch('http://localhost:3000/agent/chat/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        const data = await response.json();

        const messageResponse: Message = {
            role: "agent",
            content: data.message.content,
            userId: "assistant1",
        }

        const apiResponse: ApiMessageResponse = {
            success: true,
            message: messageResponse,
            itemsAdded: data.itemsAdded
        }

        return apiResponse;
    }
}