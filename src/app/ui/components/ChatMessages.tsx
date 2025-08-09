import React from "react";
import type { ModelMessage } from "ai";

type ChatMessagesProps = {
  messages: ModelMessage[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div>
      {messages.map((msg, i) => (
        <p
          key={i}
          style={{
            color: msg.role === "user" ? "blue" : msg.role === "assistant" ? "green" : "orange",
          }}
        >
          <strong>{msg.role}:</strong>{" "}
          {typeof msg.content === "string" ? (
            msg.content
          ) : Array.isArray(msg.content) ? (
            msg.content.map((part, idx) => (
              <span key={idx}>
                {/* Ici tu peux customiser le rendu selon type de part */}
                {typeof part === "string"
                  ? part
                  : JSON.stringify(part)}
              </span>
            ))
          ) : (
            JSON.stringify(msg.content)
          )}
        </p>
      ))}
    </div>
  );
}
