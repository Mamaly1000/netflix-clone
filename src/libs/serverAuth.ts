import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "@/libs/prismdb";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session?.user?.email) {
    return res.status(401).json({ message: "not signed in" });
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return res.status(404).json({ message: "user not found" });
  }

  return { user: currentUser };
};

export default serverAuth;
