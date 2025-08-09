import { type CoreMessage } from "ai";

const messagesToSend: CoreMessage[] = [
    // role  user | system | assistant | tool
    {
        role: "system",
        content: "You are a friendly greeter.",
    },
    {
        role: "user",
        content: "Hello, you!",
    },
    {
        role: "assistant",
        content: "Hi there!",
    },
]

const response = await fetch(
  "http://localhost:3000/api/get-completions",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messagesToSend }),
  }
);

const newMessages =
  (await response.json()) as CoreMessage[];

const allMessages = [
  ...messagesToSend,
  ...newMessages,
];

console.dir(allMessages, { depth: null });
