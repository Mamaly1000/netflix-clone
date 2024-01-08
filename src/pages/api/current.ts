import { NextApiRequest, NextApiResponse } from "next"; 
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "GET") {
    return res.status(405).json({ message: "request not allowed" });
  }

  try {

    const currentuser = await serverAuth(req, res);

    if (!currentuser) {
      return res
        .status(404)
        .json({ message: "failed to get current user data" });
    }

    return res
      .status(200)
      .json({ message: "wellcome back", user: currentuser.user });

  } catch (error) {

    return res
      .status(500)
      .json({ message: "error in getting current user data", error });
  }
}
