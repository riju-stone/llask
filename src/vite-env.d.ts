/// <reference types="vite/client" />

interface ElectronAPI {
  setSize: (width: number, height: number, animate?: boolean) => Promise<boolean>;
  getSize: () => Promise<[number, number]>;
  minimize: () => Promise<boolean>;
  close: () => Promise<boolean>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
