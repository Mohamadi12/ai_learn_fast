import { readFileSync } from "fs";
import { generateObject } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

const model = openai("gpt-4.1-nano");
// const model = anthropic("claude-instant-1")
const schema = z
  .object({
    total: z.number().describe("The total amount of the invoice."),
    currency: z.string().describe("The currency of the total amount."),
    invoiceNumber: z.string().describe("The invoice number."),
    companyAddress: z
      .string()
      .describe("The address of the company or person issuing the invoice."),
    companyName: z
      .string()
      .describe("The name of the company issuing the invoice."),
    invoiceeAddress: z
      .string()
      .describe("The address of the company or person receiving the invoice."),
  })
  .describe("The extracted data from the invoice.");

export const extractDataFromInvoice = async (invoicePath: string) => {
  const { object } = await generateObject({
    model,
    system:
      `You will receive an invoice. ` +
      `Please extract the data from the invoice.`,
    schema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: readFileSync(invoicePath),
            mimeType: "application/pdf",
          } as any,
          /*
          {
  type: "file",
  data: readFileSync("photo.jpg"),
  mimeType: "image/jpeg"
}
          */
        ],
      },
    ],
  });

  return object;
};

const result = await extractDataFromInvoice("./invoice.pdf");

console.dir(result, { depth: null });

// // Image JPEG
// mimeType: "image/jpeg"

// // Image PNG
// mimeType: "image/png"

// // Document PDF
// mimeType: "application/pdf"

// // Fichier texte
// mimeType: "text/plain"

// // Audio MP3
// mimeType: "audio/mpeg"

// // Video MP4
// mimeType: "video/mp4"
