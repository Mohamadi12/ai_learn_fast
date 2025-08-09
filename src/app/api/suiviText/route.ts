import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";


const model = openai("gpt-4.1-nano")
// const model = anthropic("claude-instant-1")

export const answerMyQuestion = async ( prompt: string ) => {
  const { textStream } = await streamText({ model, prompt });

  for await (const text of textStream) {
    process.stdout.write(text);
  }

  const finalText = await textStream; // Access the final text

  return textStream;
};

await answerMyQuestion(
  "What is the color of the sun?", 
);

// textStream envoie du texte petit à petit.
// for await attend chaque morceau et le lit dès qu’il arrive.
// process.stdout.write() affiche ce morceau immédiatement à l’écran.
// Résultat : tu vois le texte s’afficher progressivement comme si l’IA “tapait” en temps réel.