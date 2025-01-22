import { ChatOpenAI } from "@langchain/openai";
import { PrismaClient } from "@prisma/client";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { DynamicTool } from "langchain/tools";

const prisma = new PrismaClient();

export class AgentService {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.7,
    });
  }

  async setupAgent() {
    const tools = [
      new DynamicTool({
        name: "AddToShoppingList",
        description: "Add an item to the shopping list",
        func: async (input: string) => {
          const [ingredientName, quantity, userId] = input.split(",").map(s => s.trim());
          
          const item = await prisma.shoppingList.create({
            data: {
              userId,
              ingredientName,
              quantity: parseFloat(quantity),
            },
          });
          
          return `Added ${quantity} ${ingredientName}(s) to shopping list`;
        },
      }),
      new DynamicTool({
        name: "GeneralConversation",
        description: "Handle general conversation and greetings",
        func: async (input: string) => {
          const response = await this.llm.invoke(input);
          return response;
        },
      }),
    ];

    const executor = await initializeAgentExecutorWithOptions(tools, this.llm, {
      agentType: "chat-conversational-react-description",
      verbose: true,
    });

    return executor;
  }
}