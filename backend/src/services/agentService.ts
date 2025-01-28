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
        description: "Add an item to the shopping list. When a user says something like 'add X item' or 'I want Y items', format it as: itemName,quantity,userId. For example, if user says 'add 2 apples', you should call this with 'apples,2,userId'. Always include these three values separated by commas. If the item already exists in the list, its quantity will be increased by 1 or the quantity specified by the user. After using this tool, return FINAL ANSWER with the response.",
        func: async (input: string) => {
          try {
            const [name, quantity, userId] = input.split(",").map(s => s.trim());
            
            if (!name || !quantity || !userId) {
              throw new Error("Missing required parameters");
            }

            const existingItem = await prisma.shoppingList.findFirst({
              where: {
                userId,
                name: {
                  equals: name,
                  mode: 'insensitive' 
                }
              }
            });

            let item;
            if (existingItem) {
              const totalQuantity = (existingItem.quantity ?? 0) + parseFloat(quantity);
              
              item = await prisma.shoppingList.update({
                where: { id: existingItem.id },
                data: {
                  quantity: totalQuantity
                }
              });

            } else {
              item = await prisma.shoppingList.create({
                data: {
                  userId,
                  name,
                  quantity: parseFloat(quantity),
                }
              });
            }
            
            const response = await this.llm.invoke(
              `You just added ${quantity} ${name} to the user's shopping list. Respond naturally and friendly to confirm this action in less than 20 words.`
            );
            
            return JSON.stringify({
              response: response.content + `[name: "${name}", quantity: ${quantity}, userId: "${userId}", action: "add"]`
            });
          } catch (error) {
            return JSON.stringify({
              response: `I couldn't add that to your shopping list. Please try saying something like "add 2 apples" or "I need 1 bread".`
            });
          }
        },
      }),

      new DynamicTool({
        name: "RemoveFromShoppingList",
        description: "Remove an item from the shopping list. When a user says something like 'remove X item' or 'I don't want Y items', format it as: itemName,quantity,userId. For example, if user says 'remove 2 apples', you should call this with 'apples,2,userId'. Always include these three values separated by commas. If the item already exists in the list, its quantity will be decreased by 1 or the quantity specified by the user. After using this tool, return FINAL ANSWER with the response.",
        func: async (input: string) => {
          try {
            const [name, quantity, userId] = input.split(",").map(s => s.trim());

            if (!name || !quantity || !userId) {
              throw new Error("Missing required parameters");
            }

            const existingItem = await prisma.shoppingList.findFirst({
              where: {
                userId,
                name: {
                  equals: name,
                  mode: 'insensitive' 
                }
              }
            });

            let item;
            if (existingItem) {
              const totalQuantity = (existingItem.quantity ?? 0) - parseFloat(quantity);
              
              item = await prisma.shoppingList.update({
                where: { id: existingItem.id },
                data: {
                  quantity: totalQuantity
                }
              });

              const response = await this.llm.invoke(
                `You just removed ${quantity} ${name} from the user's shopping list. Respond naturally and friendly to confirm this action in less than 20 words.`
              );
              
              return JSON.stringify({
                response: response.content + `[name: "${name}", quantity: ${quantity}, userId: "${userId}", action: "add"]`
              });
            } else {
              return JSON.stringify({
                response: `I couldn't find ${name} in your shopping list.`
              });
            }
          } catch (error) {
            return JSON.stringify({
              response: `I couldn't remove that from your shopping list. Please try saying something like "remove 2 apples" or "I don't want 1 bread".`
            });
          }
        },
      }),

      new DynamicTool({
        name: "GeneralConversation",
        description: "Use this tool for all general conversation, greetings, and responses that don't involve adding items to the shopping list.",
        func: async (input: string) => {
          const response = await this.llm.invoke(
            `Respond to: "${input}"\nProvide a friendly response in less than 20 words. If the user is trying to add items to a list, suggest using clearer language.`
          );
          return JSON.stringify({
            response: response.content
          });
        },
      }),
    ];

    const executor = await initializeAgentExecutorWithOptions(tools, this.llm, {
      agentType: "chat-conversational-react-description",
      verbose: true,
      handleParsingErrors: true,
      maxIterations: 2,
      returnIntermediateSteps: false,
    });

    return executor;
  }
}