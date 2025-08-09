import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";


const model = openai("gpt-4.1-nano")
// const model = anthropic("claude-instant-1")

export const summarizeText = async(input: string) => {
    const { text } = await generateText({
  model,
  prompt: input,
  system:
    `You are a text summarizer. ` +
    `Summarize the text you receive. ` +
    `Be concise. ` +
    `Return only the summary. ` +
    `Do not use the phrase "here is a summary". ` +
    `Highlight relevant phrases in bold. ` +
    `The summary should be two sentences long. `,
});

return text
} 


const memeChose = async (input: string) => {
 const { text } = await generateText({
  model,
  messages: [
    {
      role: "system",
      content:
        `You are a text summarizer. ` +
        `Summarize the text you receive. ` +
        `Be concise. ` +
        `Return only the summary. ` +
        `Do not use the phrase "here is a summary". ` +
        `Highlight relevant phrases in bold. ` +
        `The summary should be two sentences long. `,
    },
    {
      role: "user",
      content: input,
    },
  ],
});

return text
}