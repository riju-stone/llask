export type ModelProvider = "openai" | "anthropic" | "google" | "azure" | "groq" | "mistral" | "ollama" | "qwen" | "xai";

export type Model = {
    name: string;
    provider: ModelProvider;
    description: string;
    url: string;
    apiKey: string;
    icon: string;
}

