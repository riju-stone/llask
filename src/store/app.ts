import { create } from 'zustand';

export type AppMode = 'search' | 'model' | 'off';

interface AppState {
    prompt: string;
    mode: AppMode;
    currentModel: string;
    webSearch: boolean;
    deepThink: boolean;
    setPrompt: (prompt: string) => void;
    setMode: (mode: AppMode) => void;
    setModel: (model: string) => void;
    setWebSearch: (enabled: boolean) => void;
    setDeepThink: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    prompt: '',
    mode: 'off',
    currentModel: 'gpt-3.5-turbo',
    webSearch: false,
    deepThink: false,
    setPrompt: (prompt) => set({ prompt: prompt }),
    setMode: (mode) => set({ mode }),
    setModel: (model) => set({ currentModel: model }),
    setWebSearch: (enabled) => set({ webSearch: enabled }),
    setDeepThink: (enabled) => set({ deepThink: enabled }),
}));

