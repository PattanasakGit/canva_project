import { create } from "zustand";

interface FileState {
  responseImage: string[] | undefined;
  setResponseImage: (image: string[] | undefined) => void;
  onResetResponseImageData: () => void;
}

export const useImangeResponseStore = create<FileState>((set) => ({
  responseImage: [],
  setResponseImage: (image) => set({ responseImage: image }),
  onResetResponseImageData: () => set({ responseImage: [] }),
}));
