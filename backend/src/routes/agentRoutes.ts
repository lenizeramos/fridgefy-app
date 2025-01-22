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

    res.json({ response: result.output });
  } catch (error) {
    console.error("Agent error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

export { agentRouter };