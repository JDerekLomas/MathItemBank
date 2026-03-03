import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import Anthropic from "@anthropic-ai/sdk";
import { DISCOVERY_SYSTEM_PROMPT } from "@/lib/discovery-prompt";

const useGemini = !!process.env.GEMINI_API_KEY;

async function streamGemini(
  messages: { role: string; content: string }[],
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

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
        encoder.encode(`data: ${JSON.stringify({ text: chunk.text })}\n\n`)
      );
    }
  }
}

async function streamAnthropic(
  messages: { role: string; content: string }[],
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  const anthropic = new Anthropic();
  const stream = anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    system: DISCOVERY_SYSTEM_PROMPT,
    messages: messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
      );
    }
  }
}

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return Response.json(
      { error: "messages array is required" },
      { status: 400 }
    );
  }

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        if (useGemini) {
          await streamGemini(messages, controller, encoder);
        } else {
          await streamAnthropic(messages, controller, encoder);
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
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
