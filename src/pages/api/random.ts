import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismdb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    
  if (req.method !== "GET") {
    return res.status(405).json({ message: "request not allowed" });
  }

  try {
    await serverAuth(req, res);

    const moviesCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);
    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting random data", error });
  }
}
