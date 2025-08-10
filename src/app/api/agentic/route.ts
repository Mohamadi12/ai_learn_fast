import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText, stepCountIs, streamText, tool } from "ai";
import { z } from "zod";


const model = openai("gpt-4.1-nano");
// const model = anthropic("claude-instant-1")
const getWeatherTool = tool({
  description:
    "Get the current weather in the specified city",
  inputSchema: z.object({
    city: z.string().describe("The city to get the weather for"),
  }),
  execute: async ({ city }) => {
    return `The weather in ${city} is 25°C and sunny.`;
  },
});

const askAQuestion = async (prompt: string) => {
  const { textStream, steps } = await streamText({
    model,
    prompt,
    tools: {
      getWeather: getWeatherTool,
    },
    stopWhen: stepCountIs(2),
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }
};

await askAQuestion(`What's the weather in London?`);



// import { tool, generateText } from "ai";
// import { z } from "zod";

// Tool 1 : Météo
const weather = tool({
  description: "Donne la météo pour une ville",
  inputSchema: z.object({ city: z.string() }),
  execute: async ({ city }) => ({ temperature: 28, city }),
});

// Tool 2 : Traduction
const translate = tool({
  description: "Traduit un texte en anglais",
  inputSchema: z.object({ text: z.string() }),
  execute: async ({ text }) => ({ translated: `English: ${text}` }),
});

// Appel avec plusieurs tools
const result = await generateText({
  model: "openai/gpt-4o",
  prompt: "Donne-moi la météo à Ouagadougou et traduis-la en anglais.",
  tools: { weather, translate }, // <== plusieurs outils
});


// 3 tools
// Tool 1 : Météo
const weather1 = tool({
  description: "Donne la météo pour une ville",
  inputSchema: z.object({
    city: z.string().describe("La ville à vérifier"),
  }),
  execute: async ({ city }) => {
    // Simulons un appel API météo
    const temperature = 28; // ex: 28°C
    return { city, temperature };
  },
});

// Tool 2 : Traduction en anglais
const translate1 = tool({
  description: "Traduit un texte en anglais",
  inputSchema: z.object({
    text: z.string().describe("Le texte à traduire"),
  }),
  execute: async ({ text }) => {
    // Traduction fictive
    return { translated: `In English: ${text}` };
  },
});

// Tool 3 : Conseil pique-nique
const picnicAdvisor = tool({
  description: "Donne un conseil si c’est une bonne journée pour un pique-nique",
  inputSchema: z.object({
    temperature: z.number().describe("Température en °C"),
  }),
  execute: async ({ temperature }) => {
    if (temperature >= 20 && temperature <= 30) {
      return { advice: "Parfait pour un pique-nique !" };
    } else {
      return { advice: "Pas idéal pour un pique-nique aujourd'hui." };
    }
  },
});

// Lancement
(async () => {
  const result = await generateText({
    model: "openai/gpt-4o",
    prompt:
      "Vérifie la météo à Ouagadougou, traduis-la en anglais et dis-moi si c’est un bon jour pour un pique-nique.",
    tools: {
      weather1,
      translate1,
      picnicAdvisor,
    },
  });

  console.log(result.text);
})();
