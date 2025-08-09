import type { ModelMessage } from "ai";

function normalizeMessages(
  msgs: { role: string; content: string }[]
): ModelMessage[] {
  return msgs.map((msg) => {
    // On force le type en vérifiant et castant le role
    if (msg.role === "system" || msg.role === "user" || msg.role === "assistant" || msg.role === "tool") {
      return { role: msg.role, content: msg.content } as ModelMessage;
    }
    // Si le role est inconnu, on le force en "user"
    return { role: "user", content: msg.content } as ModelMessage;
  });
}
