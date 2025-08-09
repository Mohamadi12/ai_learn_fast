import { type CoreMessage } from "ai";

const messages: CoreMessage[] = [
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
];
// const messages: CoreMessage[] = [] => ce que un chatbot peut prendre pour conserver la conversations

