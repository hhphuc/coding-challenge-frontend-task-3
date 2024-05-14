import type { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage, SiweResponse } from "siwe";

type Data = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SiweResponse | Data>,
): Promise<void> => {
  try {
    const { message, signature, nonce } = req.body;
    const siweMessage = new SiweMessage(message);

    const result = await siweMessage.verify({
      signature,
      nonce,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
