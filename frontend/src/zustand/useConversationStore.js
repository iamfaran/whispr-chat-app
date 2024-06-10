import { create } from "zustand";

export const useConversationStore = create((set) => ({
  selectedConversation: null,
  // overwrites the store selectedConversation value

  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation });
  },
  messages: [],
  setMessages: (messages) => {
    set({ messages });
  },
}));
