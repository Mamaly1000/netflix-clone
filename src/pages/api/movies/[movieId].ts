import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req, res);
    const { movieId } = req.query as { movieId: string };
    if (!movieId || typeof movieId !== "string") {
      throw new Error("Invalid Id");
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error("Invalid Id");
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting single movie", error });
  }
}
