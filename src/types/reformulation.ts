export interface HistoryEntry {
  input: string;
  versions: string[];
  timestamp: number;
  reformulationDegree?: number;
}

export interface ReformulationPreferences {
  reformulationDegree: number;
}

export interface ReformulationDegree {
  value: number;
  emoji: string;
  label: string;
  description: string;
}

export interface OpenAIConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  prompt: string;
}
