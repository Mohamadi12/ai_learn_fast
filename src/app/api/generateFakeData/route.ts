import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

const model = openai("gpt-4.1-nano");
// const model = anthropic("claude-instant-1")

const schema = z.object({
  name: z.string().describe("The name of the user"),
  age: z.number().describe("The user's age"),
  email: z.string().email().describe("The user's email address, @example.com"),
});

export const createFakeUsers = async (input: string) => {
  const { object } = await generateObject({
    model,
    prompt: input,
    system: `You are generating fake user data.`,
    output: "array",
    schema,
  });

  return object;
};

const fakeUsers = await createFakeUsers("Generate 5 fake users from the UK.");

console.dir(fakeUsers, { depth: null });
// Modifier pour traiter des scenario, des cas particuliers
