import { Message, AgentState } from "../types/AgentTypes";

export const AGENT_ACTIONS = {
    SEND_MESSAGE: 'SEND_MESSAGE',
    SET_MESSAGES: 'SET_MESSAGES',
} as const;

export type AgentAction =
  | { type: typeof AGENT_ACTIONS.SEND_MESSAGE; payload: Message }
  | { type: typeof AGENT_ACTIONS.SET_MESSAGES; payload: Message[] };

export interface IAgentContext {
  state: AgentState;
  dispatch: React.Dispatch<AgentAction>;
  sendMessage: (message: string) => void;
}