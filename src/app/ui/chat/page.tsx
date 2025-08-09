import React, { useState } from "react";
import type { CoreMessage } from "ai";
import { normalizeMessages } from "../components/normalizeMessages";
import { ChatMessages } from "../components/ChatMessages";

const model = "claude-instant-1";

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([
    { role: "system", content: "Tu es un assistant amical." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: newMessages }),
      });
      if (!res.ok) throw new Error("Erreur API");

      const data = await res.json();

      const normalized = normalizeMessages(data);
      setMessages([...newMessages, ...normalized]);
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <ChatMessages messages={messages} />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        disabled={loading}
        placeholder="Écris un message..."
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()}>
        {loading ? "Chargement..." : "Envoyer"}
      </button>
    </div>
  );
}
