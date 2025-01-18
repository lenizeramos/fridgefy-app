import express from "express";
import "dotenv/config";
import { clerkClient, getAuth, requireAuth } from "@clerk/express";

const app = express();
const PORT = 3000;

app.get("/protected", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  console.log(userId)

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user = await clerkClient.users.getUser(userId);
  res.json({ user });
});

app.get("/", (req, res) => {
  res.send("Hello, TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server is runing at http://localhost:${PORT}`);
});
