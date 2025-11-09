import { create } from "zustand";
import type { HarryPotterCharacter } from "./interface.store";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  // Characters
  characters: HarryPotterCharacter[];
  charactersLoading: boolean;
  charactersError: string | null;
  fetchCharacters2: () => Promise<void>;
  // Character by ID
  character: HarryPotterCharacter | null;
  characterLoading: boolean;
  characterError: string | null;
  fetchCharacterById: (id: string) => Promise<void>;
  // Likes
  likedCharacters: string[];
  likedCharacters2: string[];
  toggleLike2: (characterId: string) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),

  // Characters
  characters: [],
  charactersLoading: false,
  charactersError: null,
  fetchCharacters2: async () => {
    set({ charactersLoading: true, charactersError: null });
    try {
      const response = await fetch(
        "https://hp-api.onrender.com/api/characters"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const characters = await response.json();
      set({ characters, charactersLoading: false });
    } catch (error) {
      set({
        charactersError:
          error instanceof Error
            ? error.message
            : "Ошибка загрузки персонажей",
        charactersLoading: false,
      });
    }
  },

  // Character by ID
  character: null,
  characterLoading: false,
  characterError: null,
  fetchCharacterById: async (id: string) => {
    set({ characterLoading: true, characterError: null });
    try {
      const response = await fetch(
        `https://hp-api.onrender.com/api/character/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const characterData = await response.json();
      if (characterData && characterData.length > 0) {
        set({ character: characterData[0], characterLoading: false });
      } else {
        throw new Error("Персонаж не найден");
      }
    } catch (error) {
      set({
        characterError:
          error instanceof Error
            ? error.message
            : "Ошибка загрузки персонажа",
        characterLoading: false,
      });
    }
  },

  // Likes
  likedCharacters: [],
  likedCharacters2: [],
  toggleLike2: (characterId: string) => {
    set((state) => {
      const isLiked = state.likedCharacters2.includes(characterId);
      if (isLiked) {
        return {
          likedCharacters2: state.likedCharacters2.filter(
            (id) => id !== characterId
          ),
        };
      } else {
        return {
          likedCharacters2: [...state.likedCharacters2, characterId],
        };
      }
    });
  },
}));
