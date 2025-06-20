
declare global {
  interface Window {
    confetti: (options?: {
      particleCount?: number;
      spread?: number;
      origin?: { x?: number; y?: number };
      colors?: string[];
      shapes?: string[];
      scalar?: number;
    }) => void;
  }
}

export {};
