import { Response, Request } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { findUserByClerkId, createUser } from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const user = await clerkClient.users.getUser(userId);

    const existingUser = await findUserByClerkId(userId);

    if (!existingUser) {
      await createUser(userId, user.emailAddresses[0].emailAddress);
    }

    res.json({ message: "User saved in the database", user });
  } catch (error) {
    console.error("Error saving user to database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
