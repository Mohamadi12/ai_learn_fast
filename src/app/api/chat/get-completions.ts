import type { NextApiRequest, NextApiResponse } from "next";
import { generateText } from "ai";
import type { CoreMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const model = anthropic("claude-instant-1");

export default async function chatMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { messages } = req.body as { messages: CoreMessage[] };

    const result = await generateText({ model, messages });

    return res.status(200).json(result.response.messages);
  } catch (error) {
    console.error("Error in chatMessage:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
