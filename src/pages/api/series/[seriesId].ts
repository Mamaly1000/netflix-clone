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
    const { seriesId } = req.query as { seriesId: string };
    if (!seriesId || typeof seriesId !== "string") {
      throw new Error("Invalid Id");
    }

    const series = await prisma.series.findUnique({
      where: {
        id: seriesId,
      },
    });

    if (!series) {
      throw new Error("Invalid Id");
    }
    return res.status(200).json(series);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting single series", error });
  }
}
