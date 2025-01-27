import { Router } from "express";
import { AgentService } from "../services/agentService";

const agentRouter = Router();
const agentService = new AgentService();

agentRouter.post("/chat/message", async (req, res) => {
  try {
    const { message, userId } = req.body;
    const executor = await agentService.setupAgent();
    
    const result = await executor.call({
      input: `${message} (for user: ${userId})`,
    });

    let content = '';
    let agentActionResponse = null;

    if (result) {
      try {
        const outputStr = result.output.toString();
        const [readableMessage, dataString] = outputStr.split('[');
        content = readableMessage.trim();
        
        if (dataString) {
          const cleanDataString = dataString.replace(']', '');
          
          const ingredientMatch = cleanDataString.match(/name: "([^"]+)"/);
          const quantityMatch = cleanDataString.match(/quantity: (\d+)/);
          const userIdMatch = cleanDataString.match(/userId: "([^"]+)"/);
          const actionMatch = cleanDataString.match(/action: "([^"]+)"/);

          if (ingredientMatch && quantityMatch) {
            agentActionResponse = JSON.stringify([{
              id: ingredientMatch[1],
              name: ingredientMatch[1],
              quantity: parseInt(quantityMatch[1]),
              userId: userIdMatch ? userIdMatch[1] : null,
              action: actionMatch ? actionMatch[1] : null
            }]);
          }
        }
      } catch (error) {
        console.log("Error parsing response:", error);
        content = result.output.toString();
      }
    }

    res.json({ 
      success: true,
      message: {
        role: 'agent',
        content,
        userId: 'assistant1'
      },
      agentActionResponse
    });
  } catch (error) {
    console.error("Agent error:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to process request" 
    });
  }
});

export { agentRouter };