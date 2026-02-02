import { create } from "zustand";

export const useChatModalStore = create((set) => ({
  isChatOpen: false,

  openChat: () => set({ isChatOpen: true }),

  closeChat: () => set({ isChatOpen: false }),

  toggleChat: () =>
    set((state) => ({ isChatOpen: !state.isChatOpen })),
}));
