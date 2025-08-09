import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: `http://localhost:1234/v1`, // Changer juste l'URL si ça respect OpenAi
});

const model = lmstudio("");

export const askLocalLLMQuestion = async (
  input: string,
) => {
  const { text } = await generateText({
    model,
    prompt: input,
    maxRetries: 0,
  });

  return text;
};

const input = `Tell me a story about your grandmother.`;

const localLLMResult =
  await askLocalLLMQuestion(input);

console.log(localLLMResult);