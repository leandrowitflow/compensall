import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

const CURRENT_FLASH_MODEL = "gemini-3.5-flash";

const DEPRECATED_GEMINI_MODELS: Record<string, string> = {
  "gemini-pro": CURRENT_FLASH_MODEL,
  "gemini-pro-vision": CURRENT_FLASH_MODEL,
  "gemini-1.0-pro": CURRENT_FLASH_MODEL,
  "gemini-1.5-pro": CURRENT_FLASH_MODEL,
  "gemini-1.5-pro-latest": CURRENT_FLASH_MODEL,
  "gemini-1.5-flash": CURRENT_FLASH_MODEL,
  "gemini-1.5-flash-latest": CURRENT_FLASH_MODEL,
  "gemini-1.5-flash-8b": CURRENT_FLASH_MODEL,
  "gemini-2.0-flash": CURRENT_FLASH_MODEL,
  "gemini-2.0-flash-001": CURRENT_FLASH_MODEL,
  "gemini-2.0-flash-exp": CURRENT_FLASH_MODEL,
  "gemini-2.0-flash-lite": CURRENT_FLASH_MODEL,
  "gemini-2.5-pro": CURRENT_FLASH_MODEL,
  "gemini-3-pro-preview": CURRENT_FLASH_MODEL,
  "gemini-3.1-flash-lite-preview": "gemini-3.1-flash-lite",
};

const GEMINI_FALLBACK_MODELS = [
  CURRENT_FLASH_MODEL,
  "gemini-3.6-flash",
  "gemini-2.5-flash",
] as const;

function resolveGeminiModelId(envValue: string | undefined, fallback: string): string {
  const configured = (envValue?.trim() || fallback).replace(/^models\//, "");
  if (DEPRECATED_GEMINI_MODELS[configured]) {
    return DEPRECATED_GEMINI_MODELS[configured];
  }
  if (/^gemini-1\./.test(configured) || /^gemini-2\.0/.test(configured)) {
    return CURRENT_FLASH_MODEL;
  }
  return configured;
}

export function resolveGeminiModel(envValue: string | undefined, fallback: string): string {
  return resolveGeminiModelId(envValue, fallback);
}

export function isUnavailableGeminiModelError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();
  return (
    lower.includes("no longer available") ||
    (lower.includes("not found") && lower.includes("model")) ||
    (lower.includes("is not supported") && lower.includes("model")) ||
    (/\b404\b/.test(lower) && lower.includes("model"))
  );
}

/** Vision model for reading boarding passes (multimodal). */
export const GEMINI_VISION_MODEL = resolveGeminiModelId(
  process.env.GEMINI_VISION_MODEL,
  CURRENT_FLASH_MODEL,
);

/** Text model for structuring OCR output (no vision needed). */
export const GEMINI_TEXT_MODEL = resolveGeminiModelId(
  process.env.GEMINI_TEXT_MODEL,
  CURRENT_FLASH_MODEL,
);

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

export async function withGeminiModelFallback<T>(
  run: (model: LanguageModel) => Promise<T>,
  kind: "vision" | "text" = "vision",
): Promise<T> {
  const primary = kind === "vision" ? GEMINI_VISION_MODEL : GEMINI_TEXT_MODEL;
  const candidates = [primary, ...GEMINI_FALLBACK_MODELS].filter(
    (modelId, index, all) => all.indexOf(modelId) === index,
  );

  let lastError: unknown;
  for (const modelId of candidates) {
    try {
      return await run(getGeminiModel(modelId));
    } catch (error) {
      lastError = error;
      if (!isUnavailableGeminiModelError(error)) {
        throw error;
      }
      console.warn(`Gemini model unavailable (${modelId}); trying the next current model.`);
    }
  }

  throw lastError;
}
