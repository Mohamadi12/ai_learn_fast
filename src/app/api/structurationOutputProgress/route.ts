import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";

const model = openai("gpt-4.1-nano");
// const model = anthropic("claude-instant-1")

const schema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      })
    ),
    steps: z.array(z.string()),
  }),
});

/*
const schema = z.object({
  recipe: z.object({
    name: z
      .string()
      .describe("The title of the recipe"),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          amount: z.string(),
        }),
      )
      .describe(
        "The ingredients needed for the recipe",
      ),
    steps: z
      .array(z.string())
      .describe("The steps to make the recipe"),
  }),
});
*/
export const createRecipe = async (prompt: string) => {
  const result = await streamObject({
    model,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,
    schemaName: "Recipe",
    schema,
    prompt,
  });

  /*
 export const createRecipe = async (prompt: string) => {
  const result = await streamObject({
    model,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,
    schema,
    prompt,
  });

  for await (const obj of result.partialObjectStream) {
    console.clear();
    console.dir(obj, { depth: null });
  }

  const finalObject = await result.object;

  return finalObject.recipe;
};
  */


// Acceder à l'objet pendant qu'il est généré
  for await (const obj of result.partialObjectStream) {
    console.clear();
    console.dir(obj, { depth: null });
  }

  const finalObject = await result.object;

  return finalObject.recipe;
};
