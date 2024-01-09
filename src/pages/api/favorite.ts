import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismdb";

import { without } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { user } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedUser = await prisma.user.update({
        where: {
          email: user.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res
        .status(200)
        .json({ message: "thanks for your like", user: updatedUser });
    }

    if (req.method === "DELETE") {
      const { user } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(user.favoriteIds, movieId);

      const updatedUser = await prisma.user.update({
        where: {
          email: user.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json({ message: "Disliked!", user: updatedUser });
    }

    return res.status(405).end();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting favorites movies", error });
  }
}
