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
      temperature: 0,  
    });
  }

  async setupAgent() {
    const tools = [
      new DynamicTool({
        name: "AddToShoppingList",
        description: "Add an item to the shopping list. Input format: ingredientName,quantity,userId",
        func: async (input: string) => {
          try {
            const [ingredientName, quantity, userId] = input.split(",").map(s => s.trim());
            
            const item = await prisma.shoppingList.create({
              data: {
                userId,
                ingredientName,
                quantity: parseFloat(quantity),
              },
            });
            
            return `Successfully added ${quantity} ${ingredientName}(s) to shopping list`;
          } catch (error) {
            return `Failed to add item to shopping list: ${error}`;
          }
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
      handleParsingErrors: true,
    });

    return executor;
  }
}