import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai";


const model = anthropic("claude-instant-1")
// const model = openai("gpt-4")

export const answerMyQuestion = async ( prompt: string ) => {
  const { text } = await generateText({ model, prompt });

  return text;
};


const answer = await answerMyQuestion(
  "what is the chemical formula for dihydrogen monoxide?",
);

console.log(answer);

// prompt => refrer saisie input

