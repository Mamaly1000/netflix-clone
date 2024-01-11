import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismdb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { user } = await serverAuth(req, res);
    if (!user) {
      throw new Error("User is unauthorized");
    }
    if (!user.IsAdmin) {
      throw new Error("You are not admin");
    }
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: user.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ users, admins });
  } catch (error) {
    return res.status(500).json({ message: "error in getting users", error });
  }
}
