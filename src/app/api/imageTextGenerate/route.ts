import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { readFile } from "fs/promises";
import { readFileSync } from "fs";

const model = openai("gpt-4.1-nano");
// const model = anthropic("claude-instant-1")

const systemPrompt =
  `You will receive an image. ` +
  `Please create an alt text for the image. ` +
  `Be concise. ` +
  `Use adjectives only when necessary. ` +
  `Do not pass 160 characters. ` +
  `Use simple language. `;

export const describeImage = async (imagePath: string) => {
  const { text } = await generateText({
    model,
    system: systemPrompt,
  });

  return text;
};

// Image no bloquant lors du traitement
// Transformer le text en description
export const describeImageNoBlocked = async (imagePath: string) => {
  const imageAsUint8Array = await readFile(imagePath);
  const { text } = await generateText({
    model,
    system: systemPrompt,
  });

  return text;
};

// Image async lors du traitement
// Transformer le text en description
export const describeImageAsync = async (imagePath: string) => {
  const imageAsUint8Array = readFileSync(imagePath);
  const { text } = await generateText({
    model,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: imageAsUint8Array,
          },
        ],
      },
    ],
    /*
  const imageAsUint8Array = readFileSync(imagePath);
  const { text } = await generateText({
    model,
    system: systemPrompt,
  });
    */
  });

  return text;
};

const description = await describeImage("./fireworks.jpg");

console.log(description);

// Avec une URL
export const describeImageUrl = async (imageUrl: string) => {
  const { text } = await generateText({
    model,
    system:
      `You will receive an image. ` +
      `Please create an alt text for the image. ` +
      `Be concise. ` +
      `Use adjectives only when necessary. ` +
      `Do not pass 160 characters. ` +
      `Use simple language. `,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(imageUrl),
          },
        ],
      },
    ],
  });

  return text;
};

const descriptionUrl = await describeImageUrl(
  "https://github.com/ai-hero-dev/ai-hero/blob/main/internal/assets/image.jpg?raw=true"
);

console.log(description);
