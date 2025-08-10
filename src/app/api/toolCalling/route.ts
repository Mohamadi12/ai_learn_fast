import { tool, generateText } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

const model = openai("gpt-4.1-nano");
// const model = anthropic("claude-instant-1")

const logToConsoleTool = tool({
  description: "Log a message to the console",
  inputSchema: z.object({
    message: z
      .string()
      .describe("The message to log to the console"),
  }),
   execute: async ({ message }: { message: string }) => {
    console.log(message);
  },
});

// Just log to console
const logToConsole = async (prompt: string) => {
  await generateText({
    model,
    prompt,
    system:
      `Your only role in life is to log ` +
      `messages to the console. ` +
      `Use the tool provided to log the ` +
      `prompt to the console.`,
    tools: {
      logToConsole: logToConsoleTool,
    },
  });
};

// Debug console
const DebugConsole = async (prompt: string) => {
  const { steps } = await generateText({
    model,
    prompt,
    system:
      `Your only role in life is to log ` +
      `messages to the console. ` +
      `Use the tool provided to log the ` +
      `prompt to the console.`,
    tools: {
      logToConsole: logToConsoleTool,
    },
  });

  console.dir(steps[0]?.toolCalls, { depth: null });
};