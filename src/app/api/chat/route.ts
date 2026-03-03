import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { DISCOVERY_SYSTEM_PROMPT } from "@/lib/discovery-prompt";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return Response.json(
      { error: "messages array is required" },
      { status: 400 }
    );
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  // Convert our message format to Gemini's contents format
  const contents = messages.map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const response = await ai.models.generateContentStream({
          model: "gemini-3-flash-preview",
          contents,
          config: {
            systemInstruction: DISCOVERY_SYSTEM_PROMPT,
            maxOutputTokens: 512,
          },
        });

        for await (const chunk of response) {
          if (chunk.text) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ text: chunk.text })}\n\n`
              )
            );
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: message })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
