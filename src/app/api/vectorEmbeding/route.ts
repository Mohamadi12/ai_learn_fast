import { openai } from "@ai-sdk/openai";
import { embedMany, embed, cosineSimilarity  } from "ai";
// import { lmstudio } from "@ai-sdk/openai-compatible";

const model = openai.embedding(
  "text-embedding-3-small",
);
// Si j'ai des données local dans mon serveur
// export const localModel = lmstudio.textEmbeddingModel("")

const values = ["Dog", "Cat", "Car", "Bike"];

const { embeddings } = await embedMany({
  model,
//model: localModel,
  values,
});

// console.dir(embeddings, { depth: null });


// Mapping des valeurs et des embeddings (suite)
const vectorDatabase = embeddings.map(
  (embedding, index) => ({
    value: values[index],
    embedding,
  }),
);

// Chercher un terme dans la base de données (suite)
const searchTerm = await embed({
  model,
  //model: localModel,
  value: "Canine",
});

// Calculer la similarité entre deux termes (suite)
const entries = vectorDatabase.map((entry) => {
  return {
    value: entry.value,
    similarity: cosineSimilarity(
      entry.embedding,
      searchTerm.embedding,
    ),
  };
});

const sortedEntries = entries.sort(
  (a, b) => b.similarity - a.similarity,
);

console.dir(sortedEntries, { depth: null });