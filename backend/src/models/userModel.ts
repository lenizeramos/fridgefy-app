import { prisma } from "../prisma";

export const findUserByClerkId = async (clerkId: string) => {
  return await prisma.user.findUnique({
    where: { clerkId },
  });
};

export const createUser = async (clerkId: string, email: string) => {
  return await prisma.user.create({
    data: {
      clerkId,
      email,
    },
  });
};
