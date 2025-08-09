import type { NextApiRequest, NextApiResponse } from "next";
import { generateText } from "ai";
import type { CoreMessage } from "ai";

export async function chatMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { model, messages } = req.body as { model: string; messages: CoreMessage[] };

    if (!model || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "model and messages are required" });
    }

    const result = await generateText({ model, messages });

    return res.status(200).json(result.response.messages);
  } catch (error) {
    console.error("Error in chatMessage:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export default chatMessage;
