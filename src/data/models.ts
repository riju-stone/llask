import { Model } from "../types/model";

export const AVAILABLE_MODELS: Model[] = [
  {
    name: "GPT-4o",
    provider: "openai",
    description: "OpenAI's most advanced multimodal model",
    url: "https://api.openai.com/v1/chat/completions",
    apiKey: "",
    icon: "sparkles"
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    description: "Anthropic's most intelligent model",
    url: "https://api.anthropic.com/v1/messages",
    apiKey: "",
    icon: "brain"
  },
  {
    name: "Gemini Pro 1.5",
    provider: "google",
    description: "Google's most capable AI model",
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
    apiKey: "",
    icon: "zap"
  },
  {
    name: "Llama 3 8B",
    provider: "ollama",
    description: "Meta's open source model (Local)",
    url: "http://localhost:11434/api/chat",
    apiKey: "",
    icon: "laptop"
  },
  {
    name: "Mistral Large",
    provider: "mistral",
    description: "Mistral AI's flagship model",
    url: "https://api.mistral.ai/v1/chat/completions",
    apiKey: "",
    icon: "wind"
  }
];

