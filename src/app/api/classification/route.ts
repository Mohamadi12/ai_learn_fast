import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";

const model = openai("gpt-4.1-nano");
// const model = anthropic("claude-instant-1")

export const classifySentiment = async ( text: string ) => {
  const { object } = await generateObject({
    model,
    output: "enum",
    enum: ["positive", "negative", "neutral"],
    prompt: text,
    system:
      `Classify the sentiment of the text as either ` +
      `positive, negative, or neutral.`, 
    });

  return object;
};

const result = await classifySentiment(
  `I love this so much`,
);

console.log(result); // positive

