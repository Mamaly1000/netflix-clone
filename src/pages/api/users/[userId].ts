import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismdb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).json({ message: `Method ${req.method}` });
  }
  try {
    const { user } = await serverAuth(req, res);

    const id = req.query.userId as string;

    if (!id || typeof id !== "string") {
      throw new Error("Invalid Id");
    }

    if (!user) {
      throw new Error("user not found");
    }

    if (!user.IsAdmin) {
      // admin can see all users' info
      return res.status(401).json({ message: "unAuthorized" });
    }

    if (req.method === "GET") {
      const favoriteMovies = await prisma.movie.findMany({
        where: {
          id: {
            in: user.favoriteMovies,
          },
        },
      });
      const favoriteSeries = await prisma.series.findMany({
        where: {
          id: {
            in: user.favoriteSeries,
          },
        },
      });

      return res
        .status(200)
        .json({ user, movies: favoriteMovies, series: favoriteSeries });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting user data", error });
  }
}
