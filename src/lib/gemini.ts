import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

/** Vision model for reading boarding passes (multimodal). */
export const GEMINI_VISION_MODEL = process.env.GEMINI_VISION_MODEL ?? "gemini-2.5-pro";

/** Text model for structuring OCR output (no vision needed). */
export const GEMINI_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL ?? "gemini-2.5-flash";

export function getGeminiApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
}

export function isGeminiConfigured(): boolean {
  return Boolean(getGeminiApiKey());
}

function createGoogleProvider() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return createGoogleGenerativeAI({ apiKey });
}

export function getGeminiModel(modelId: string): LanguageModel {
  return createGoogleProvider()(modelId);
}

export function getGeminiVisionModel(): LanguageModel {
  return getGeminiModel(GEMINI_VISION_MODEL);
}

export function getGeminiTextModel(): LanguageModel {
  return getGeminiModel(GEMINI_TEXT_MODEL);
}
